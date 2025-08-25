import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CURRENT_USER } from './auth.constant';
import { AuthService } from './auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    if (request) {
      const user = request[CURRENT_USER];
      if (user) {
        this.authService.setCurrentUser(user);
      }

      this.authService.setAcceptLanguage(
        request.headers['accept-language']
          ? request.headers['accept-language'] === '*'
            ? undefined
            : request.headers['accept-language']
          : undefined,
      );
    } else {
      const graphqlContext = GqlExecutionContext.create(context);
      const gqlRequest = graphqlContext.getContext<GqlExecutionContext>();
      const request = gqlRequest.req;
      const user = request[CURRENT_USER];
      if (user) {
        this.authService.setCurrentUser(user);
      }

      this.authService.setAcceptLanguage(
        request.headers['accept-language']
          ? request.headers['accept-language'] === '*'
            ? undefined
            : request.headers['accept-language']
          : undefined,
      );
    }

    return next.handle();
  }
}
