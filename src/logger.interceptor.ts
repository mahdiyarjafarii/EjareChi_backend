import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      tap((resData) => {
        const response = context.switchToHttp().getResponse();
        const request = context.switchToHttp().getRequest();
        const responseTime = Date.now() - now;
        const responseBody = JSON.stringify(resData);

        // console.log(
        //   `Request: ${request.method} ${request.url}`,
        //   `Response: ${response.statusCode}`,
        //   `Response Time: ${responseTime}ms`,
        //   `Response Body: ${JSON.stringify(responseBody)}`, // Log the response body
        // );
        const logObj = {
          method: request.method,
          url: request.url,
          status: response.statusCode,
          req: { body: response.body, headers: {} },
          res: {
            headers: response.getHeaders(),
            body: responseBody,
          },
        };
        this.logger.log(JSON.stringify(logObj), 'HttpClient');
      }),
    );
  }
}
