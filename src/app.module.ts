import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductsController } from './v1/products/products.controller';
import { ProductsModule } from './v1/products/products.module';

@Module({
  imports: [ConfigModule.forRoot(), ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
