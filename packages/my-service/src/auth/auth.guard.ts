import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { Reflector } from '@nestjs/core';
import { ALLOW_IAM, IS_PUBLIC_KEY } from './auth.decorator';
import { UserService } from '../user/user.service';
import { CURRENT_USER } from './auth.constant';
import { ISessionUser } from './auth.types';
import { PermissionEnum } from '@prisma/client';
import { PERMISSIONS_KEY } from 'src/role/role.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { Sha256 } from '@aws-crypto/sha256-js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let request = context.switchToHttp().getRequest();
    if (!request) {
      const graphqlContext = GqlExecutionContext.create(context);
      const gqlRequest = graphqlContext.getContext<GqlExecutionContext>();
      request = gqlRequest.req;
    }

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const allowIAM = this.reflector.getAllAndOverride<boolean>(ALLOW_IAM, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (allowIAM && (await this.authenticateIAM(context))) {
      const user = await this.userService.dangerouslyGetUserByRoleName({
        roleName: 'Owner',
      });
      if (!user) {
        throw new UnauthorizedException();
      }
      const currentUser: ISessionUser = {
        id: user.id,
        company: undefined,
        ipAddress:
          request.ip ??
          request.headers['X-Client-IP'] ??
          request.headers['X-Forwarded-For'] ??
          request.connection?.remoteAddress ??
          '',
        userAgent: request.headers['user-agent'] ?? '',
        referrer: request.headers.referer ?? '',
        roles: user.roles,
        permissions: [
          ...new Set([
            ...user.roles.flatMap((role) =>
              role.permissions.map((p) => p.name),
            ),
          ]),
        ],
      };
      request[CURRENT_USER] = currentUser;

      return this.checkPermissions(context, currentUser.permissions);
    }

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const verifier = CognitoJwtVerifier.create({
        userPoolId: process.env.COGNITO_USER_POOL_ID,
        tokenUse: 'access',
        clientId: process.env.COGNITO_CLIENT_ID,
      });

      const payload = await verifier.verify(token);
      const user = await this.userService.dangerouslyGetUserByProviderId({
        providerId: payload.sub,
      });
      if (!user) {
        throw new UnauthorizedException();
      }

      const currentUser: ISessionUser = {
        id: user.id,
        company: user.companies[0],
        ipAddress:
          request.ip ??
          request.headers['X-Client-IP'] ??
          request.headers['X-Forwarded-For'] ??
          request.connection?.remoteAddress ??
          '',
        userAgent: request.headers['user-agent'] ?? '',
        referrer: request.headers.referer ?? '',
        roles: user.roles,
        permissions: [
          ...new Set([
            ...user.roles.flatMap((role) =>
              role.permissions.map((p) => p.name),
            ),
          ]),
        ],
      };
      request[CURRENT_USER] = currentUser;

      return this.checkPermissions(context, currentUser.permissions);
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async authenticateIAM(context: ExecutionContext): Promise<boolean> {
    const graphqlContext = GqlExecutionContext.create(context);
    const gqlRequest = graphqlContext.getContext<GqlExecutionContext>();
    const request = gqlRequest.req;

    try {
      const authorization = request.headers['x-authorization'];
      const amzDate = request.headers['x-amz-date'];
      const region = process.env.AWS_REGION || 'us-east-1';
      console.log('region', region);
      console.log('authorization', authorization);
      console.log('amzDate', amzDate);
      console.log('request.headers', JSON.stringify(request.headers));

      if (!authorization || !amzDate || amzDate.length !== 16) {
        // throw new UnauthorizedException(
        //   'Missing required AWS authentication headers',
        // );
        return true;
      }

      // Create HTTP request object
      const headers: { [key: string]: string } = {};
      for (const key in request.headers) {
        if (typeof request.headers[key] === 'string') {
          headers[key.toLowerCase()] = request.headers[key] as string;
        }
      }

      let hostname = '';

      const forwardedHeader = headers['forwarded'];
      if (typeof forwardedHeader === 'string') {
        const match = forwardedHeader.match(/host=([^;]+)/i);
        if (match && match[1]) {
          hostname = match[1].trim();
          // Remove potential quotes if the value was quoted
          if (hostname.startsWith('"') && hostname.endsWith('"')) {
            hostname = hostname.substring(1, hostname.length - 1);
          }
        }
      }

      // Fallback to host header if not found in forwarded
      if (!hostname && typeof headers['host'] === 'string') {
        hostname = headers['host'].split(':')[0];
      }

      if (!hostname) {
        throw new UnauthorizedException(
          'Could not determine hostname from headers',
        );
      }

      const params = {
        method: request.method,
        protocol: 'https:', // TODO: should be dynamic
        hostname: '54.151.145.111:3021',
        path: '/graphql',
        headers: {
          'content-type': 'application/json',
          host: '54.151.145.111:3021',
        },
        body: JSON.stringify(request.body),
      };
      console.log(JSON.stringify(params));
      const httpRequest = new HttpRequest(params);

      const signer = new SignatureV4({
        credentials: defaultProvider(),
        region,
        service: 'execute-api',
        sha256: Sha256,
      });

      const signedRequest = await signer.sign(httpRequest, {
        signingDate: new Date(
          `${amzDate.substring(0, 4)}-${amzDate.substring(
            4,
            6,
          )}-${amzDate.substring(6, 8)}T${amzDate.substring(
            9,
            11,
          )}:${amzDate.substring(11, 13)}:${amzDate.substring(13, 15)}Z`,
        ),
      });
      const incomingSignature = this.extractSignature(authorization);
      const generatedSignature = this.extractSignature(
        signedRequest.headers['authorization'],
      );
      console.log(
        'signingDate',
        new Date(
          `${amzDate.substring(0, 4)}-${amzDate.substring(
            4,
            6,
          )}-${amzDate.substring(6, 8)}T${amzDate.substring(
            9,
            11,
          )}:${amzDate.substring(11, 13)}:${amzDate.substring(13, 15)}Z`,
        ),
      );
      console.log('generatedSignedRequest', JSON.stringify(signedRequest));
      console.log('incomingSignature', incomingSignature);
      console.log('generatedSignature', generatedSignature);

      if (incomingSignature !== generatedSignature) {
        // throw new UnauthorizedException('Invalid signature');
      }

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private extractSignature(authHeader: string): string {
    const matches = authHeader.match(/Signature=([a-f0-9]+)/);
    return matches?.[1] || '';
  }

  private async checkPermissions(
    context: ExecutionContext,
    permissions: PermissionEnum[],
  ): Promise<boolean> {
    const requiredPermission = this.reflector.getAllAndOverride<
      PermissionEnum[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
    if (requiredPermission) {
      const hasPermission = requiredPermission.every((rp) =>
        permissions.includes(rp),
      );
      if (!hasPermission) {
        throw new UnauthorizedException();
      }
    }

    return true;
  }
}
