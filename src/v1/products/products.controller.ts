import { Controller, ParseUUIDPipe, Get, Post, Delete } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators';
import { ProductsService } from './products.service';
import { ProductCreateReq, ProductEntity } from './dtos/products.dto';

@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productsService.getAllProductsService();
  }
  @Get(':id')
  async getProductByID(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProductEntity> {
    return await this.productsService.getProductByIDService(id);
  }
  @Post('/create')
  async createProduct(
    @Body() productDTO: ProductCreateReq,
  ): Promise<ProductEntity> {
    return await this.productsService.createProductService(productDTO);
  }
  @Post('/update/:id')
  updateProduct(@Param('id', ParseUUIDPipe) id: string): string {
    return id;
  }
  @Delete(':id')
  async deleteProduct(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProductEntity> {
    return await this.productsService.getProductByIDService(id);
  }
}
