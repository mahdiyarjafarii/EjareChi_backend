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
import { SearchModule } from './v1/search/search.module';
import { SearchController } from './v1/search/search.controller';
import { SearchService } from './v1/search/search.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RentalModule,
    PrismaModule,
    AuthModule,
    SearchModule,
  ],
  controllers: [AppController, SearchController],
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
    SearchService,
  ],
})
export class AppModule {}
