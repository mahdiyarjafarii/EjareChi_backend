import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import ClsContextStorageService, {
  ContextStorageServiceKey,
} from './infrastructure/context/context.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(ContextStorageServiceKey)
    private readonly cls: ClsContextStorageService,
  ) {}
  private readonly logger = new Logger();

  use(request: Request, response: Response, next: NextFunction) {
    const reqStart = Date.now();
    response.on('finish', (e) => {
      const context = 'HttpClient';

      const resEnd = Date.now();

      const statusCode = response.statusCode;

      // Gather client IP using a function that respects reverse proxies
      const getClientIp = (req) => {
        return (
          req.headers['x-forwarded-for'] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          req.ip
        );
      };

      const shouldLogBody =
        statusCode < 200 || (statusCode >= 300 && statusCode !== 304);

      const logObj: any = {
        timestamp: new Date().toISOString(),
        clientIp: getClientIp(request),
        method: request.method,
        url: request.url,
        status: response.statusCode,
        correlationId: this.cls.getContextId(),
        referrer:
          request.headers['referrer'] || request.headers['referer'] || '-',
        userAgent: request.headers['user-agent'] || '-',
        responseTime: `${resEnd - reqStart}ms`,
      };

      if (shouldLogBody) {
        logObj.requestHeaders = request.headers;
        logObj.requestBody = request.body;
      }

      this.logger.log(logObj, context);
    });

    next();
  }
}
