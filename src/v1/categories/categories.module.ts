import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';

@Module({
  providers: [CategoriesService,PrismaModule],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
