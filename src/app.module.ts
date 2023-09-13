import { Module } from '@nestjs/common';
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

@Module({
  imports: [ConfigModule.forRoot(), RentalModule , PrismaModule, AuthModule],
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
export class AppModule {}
