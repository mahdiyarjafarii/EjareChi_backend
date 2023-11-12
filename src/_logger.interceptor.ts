// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
//   Logger,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable()
// export class LoggingInterceptor implements NestInterceptor {
//   private readonly logger = new Logger();
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const now = Date.now();
//     return next.handle().pipe(
//       tap((resData) => {
//         const response = context.switchToHttp().getResponse();
//         const request = context.switchToHttp().getRequest();
//         const now = Date.now();
//         const responseTime = now - request.startTime; // Assuming request.startTime is when the request handling started
//         const responseBody = JSON.stringify(resData);
//         const responseSize = Buffer.byteLength(responseBody, 'utf8');
//         const statusCode = response.statusCode;

//         // Gather client IP using a function that respects reverse proxies
//         const getClientIp = (req) => {
//           return (
//             req.headers['x-forwarded-for'] ||
//             req.connection.remoteAddress ||
//             req.socket.remoteAddress ||
//             req.ip
//           );
//         };

//         const shouldLogBody = statusCode < 200 || statusCode >= 300;

//         const logObj: any = {
//           timestamp: new Date().toISOString(),
//           clientIp: getClientIp(request),
//           method: request.method,
//           url: request.url,
//           //httpVersion: request.httpVersion,
//           status: response.statusCode,
//           responseSize: responseSize,
//           referrer:
//             request.headers['referrer'] || request.headers['referer'] || '-',
//           userAgent: request.headers['user-agent'] || '-',
//           responseTime: `${responseTime}ms`,
//         };
//         console.log({ shouldLogBody });

//         if (shouldLogBody) {
//           logObj.requestHeaders = request.headers;
//           logObj.requestBody = request.body;
//           logObj.responseHeaders = response.getHeaders();
//           logObj.responseBody = resData; // assuming resData is already the response body
//         }

//         this.logger.log(logObj, 'HttpClient');
//       }),
//     );
//   }
// }
