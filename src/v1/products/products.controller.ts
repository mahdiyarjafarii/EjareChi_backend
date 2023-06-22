import { Controller, Get, Post, Delete } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators';
import { ProductsService } from './products.service';
import { ProductCreateReq } from './dtos/products.dto';

@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getAllProducts(): string {
    this.productsService.getAllProductsService();
    return '';
  }
  @Get(':id')
  getProductByID(@Param('id') id: string): string {
    return id;
  }
  @Post('/create')
  async createProduct(@Body() productDTO: ProductCreateReq): Promise<string> {
    return await this.productsService.createProductService(productDTO);
  }
  @Post('/update/:id')
  updateProduct(@Param('id') id: string): string {
    return id;
  }
  @Delete(':id')
  deleteProduct(@Param('id') id: string): string {
    return id;
  }
}
