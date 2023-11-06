//https://timothy.hashnode.dev/advance-your-nestjs-application-with-winston-logger-a-step-by-step-guide
//https://lsmod.medium.com/nestjs-setting-up-file-logging-daily-rotation-with-winston-28147af56ec4

import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';

export const instance = WinstonModule.createLogger({
  transports: [
    // let's log errors into its own file
    new transports.File({
      filename: `logs/error.log`,
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
    }),
    // logging all level
    new transports.File({
      filename: `logs/combined.log`,
      format: format.combine(format.timestamp(), format.json()),
    }),
    // we also want to see logs in our console
    new transports.Console({
      format: format.combine(
        format.cli(),
        format.splat(),
        format.timestamp(),
        format.printf((info) => {
          return `${info.timestamp} ${info.level}: ${info.message}`;
        }),
      ),
    }),
  ],
});
