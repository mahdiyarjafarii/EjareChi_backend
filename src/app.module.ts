import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './v1/auth/auth.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { UserInterceptor } from './v1/interceptors/user.interceptor';
// import { SearchModule } from './infrastructure/elasticsearch/elasticsearch.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { RentalModule } from './v1/rental/rental.module';
import { SearchModule } from './v1/search/search.module';
import { ESSearchModule } from './infrastructure/elasticsearch/elasticsearch.module';
import { LoggerModule } from 'nestjs-pino';
import { ReservationModule } from './v1/reservation/reservation.module';
import { UserModule } from './v1/user/user.module';
import { MailModule } from './v1/mail/mail.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoggerMiddleware } from './logger.middleware';
import { RequestLoggerMiddleware } from './win.middleware';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot(),
    RentalModule,
    PrismaModule,
    AuthModule,
    ReservationModule,
    SearchModule,
    UserModule,
    MailModule,
    // LoggerModule.forRoot({
    //   pinoHttp: {
    //     autoLogging: false,
    //     redact: {
    //       paths: ['req'],
    //       remove: true,
    //     },
    //     // serializers: {
    //     //   ...pino.stdSerializers,
    //     //   log: customLogSerializer, // Use the custom serializer
    //     // },
    //     customProps: (req, res) => ({
    //       context: 'HTTP',
    //     }),
    //     transport: {
    //       target: 'pino-pretty',
    //       options: {
    //         singleLine: true,
    //       },
    //     },
    //   },
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     console.log(123);
//     consumer.apply(LoggerMiddleware).forRoutes('*');
//   }
// }
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log(123);
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}