import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductController } from './v1/product/product.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, ProductController],
  providers: [AppService],
})
export class AppModule {}
