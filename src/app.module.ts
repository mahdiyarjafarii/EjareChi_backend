import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './v1/products/products.module';
import { PrismaModule } from './insfrastructure/prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), ProductsModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
