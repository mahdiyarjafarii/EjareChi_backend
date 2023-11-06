import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', (e) => {

      let context = "HttpClient"
      
      const statusCode = res.statusCode;

      const {body, method, originalUrl, headers} = req;
      const {cookie , getHeaders , } = res;
      
      if (statusCode) {
        //this.logger.log(`[${req.method}] ${req.url} - ${statusCode} - req : ${{body, method, originalUrl, headers}}`);
        let logObj = {
          method: req.method,
          url: req.url,
          status: statusCode,
          req:{body , headers:{

          }},

        }
        this.logger.log(JSON.stringify(logObj) , context);

      }
    });

    next();
  }
}
