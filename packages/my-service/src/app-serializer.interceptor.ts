import {
  CallHandler,
  ClassSerializerInterceptor,
  ExecutionContext,
  Injectable,
  PlainLiteralObject,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { CURRENT_USER } from './auth/auth.constant';
import { ISessionUser } from './auth/auth.types';

@Injectable()
export class AppSerializerInterceptor extends ClassSerializerInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const user: ISessionUser = request[CURRENT_USER];

    const contextOptions = this.getContextOptions(context);
    const options = {
      ...this.defaultOptions,
      ...contextOptions,
      groups: user.permissions,
    };
    return next
      .handle()
      .pipe(
        map((res: PlainLiteralObject | PlainLiteralObject[]) =>
          this.serialize(res, options),
        ),
      );
  }
}
