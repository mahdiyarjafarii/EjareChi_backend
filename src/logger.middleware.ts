import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', (e) => {
      const context = 'HttpClient';

      const statusCode = res.statusCode;

      const { body, method, originalUrl, headers } = req;

      const oldWrite = res.write;
      const oldEnd = res.end;
      const chunks = [];
      res.write = function (chunk: any) {
        console.log({chunk});
        
        chunks.push(chunk);
        return oldWrite.apply(res, chunk);
      };
      res.end = function (chunk: any) {
        if (chunk) {
          chunks.push(chunk);
        }
        return oldEnd.apply(res, chunk);
      };
      //const { cookie, headers:getHeaders() } = res;

      if (statusCode) {
        //this.logger.log(`[${req.method}] ${req.url} - ${statusCode} - req : ${{body, method, originalUrl, headers}}`);
        //console.log({ resBodyBuffer });

        const logObj = {
          method: req.method,
          url: req.url,
          status: statusCode,
          req: { body, headers: {} },
          res: {
            //headers: res.getHeaders(),
            body: Buffer.concat(chunks).toString('utf8'),
          },
        };
        this.logger.log(JSON.stringify(logObj), context);
      }
    });

    next();
  }
}
