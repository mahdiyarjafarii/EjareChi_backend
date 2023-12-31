import { ClsModule } from 'nestjs-cls';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './guards/auth.guard';
import { AppController } from './app.controller';
import { UserModule } from './v1/user/user.module';
import { MailModule } from './v1/mail/mail.module';
import { AuthModule } from './v1/auth/auth.module';
import { SearchModule } from './v1/search/search.module';
import { RentalModule } from './v1/rental/rental.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLoggerMiddleware } from './logger.middleware';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { UserInterceptor } from './v1/interceptors/user.interceptor';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ReservationModule } from './v1/reservation/reservation.module';
import { ContextModule } from './infrastructure/context/context.module';
// import { SearchModule } from './infrastructure/elasticsearch/elasticsearch.module';
import { NotificationModule } from './v1/notification/notification.module';
import { CommentModule } from './v1/comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RentalModule,
    PrismaModule,
    AuthModule,
    ReservationModule,
    SearchModule,
    UserModule,
    MailModule,
    CommentModule,
    // ClsModule.forRoot({
    //   middleware: {
    //     //global: true,

    //     // automatically mount the
    //     // ClsMiddleware for all routes
    //     mount: true,
    //     // and use the setup method to
    //     // provide default store values.
    //     // setup: (cls, req) => {
    //     //   cls.set('userId', req.headers['x-user-id']);
    //     // },
    //     generateId: true,
    //     idGenerator: (req: Request) => req.headers['x-correlation-id'] ?? v4(),
    //   },
    // }),
    ContextModule,
    NotificationModule,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
