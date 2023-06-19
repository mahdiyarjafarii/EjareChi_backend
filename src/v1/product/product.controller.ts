import { Controller, Get } from '@nestjs/common';

@Controller({
  path: 'product',
  version: '1',
})
export class ProductController {
  @Get('get')
  getProduct(): string {
    return 'yoooo';
  }
}
