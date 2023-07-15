import { PrismaService } from 'src/infrastructure/prisma/prisma.service'; 
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAllCategoriesService(): Promise<string[]> {
    await this.prismaService.categories.findMany({});
    return ['1'];
  }
}
