import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  getAllCategoriesService(): string[] {
    return ['1'];
  }
}
