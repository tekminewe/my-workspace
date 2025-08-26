import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OkResponseDto, PaginatedOkResponse } from './app.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const type = context.getType();
        if (type !== 'http') {
          return data;
        }

        if (!data) {
          return new OkResponseDto({ data: null });
        }

        if (!data.pagination) {
          return new OkResponseDto({ data });
        }

        return new PaginatedOkResponse({
          data: data.data,
          pagination: data.pagination,
        });
      }),
    );
  }
}
