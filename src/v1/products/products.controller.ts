import { Controller, ParseUUIDPipe, Get, Post, Delete, UnauthorizedException,UseGuards } from '@nestjs/common';
import { Body, Param, Put, Query } from '@nestjs/common/decorators';
import { ProductsService } from './products.service';
import {
  ProductCreateReq,
  ProductEntity,
  ProductUpdateReq,
} from './dtos/products.dto';
import { User, UserType } from '../decorators/user.decorator';
import { userType } from '@prisma/client';
import { Roles } from '../decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';




@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get( )
  async getAllProducts(
    @Query('approved') approvedStatus?: boolean,
    @User() user?:UserType
  ): Promise<ProductEntity[]> {
    console.log(user)
    
    return await this.productsService.getAllProductsService(approvedStatus);
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
    @User() user?:UserType
  ): Promise<ProductEntity> {
    return await this.productsService.createProductService(productDTO,user.userId);
  }

  @Put('/update/:id')
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productUpdateDTO: ProductUpdateReq,
    @User() user?:UserType
  ): Promise<ProductEntity> {

    try{
       //for finde creator of home with id in query
    const userCreator=await this.productsService.getUserIdByhomeId(id);
    //for check the creator prodcuts is equal to jwt request
    if(userCreator.id!==user.userId){
      throw new UnauthorizedException();
    }
  }catch(error){
    throw new UnauthorizedException();
    
  }
  return await this.productsService.updateProductService(
    id,
    productUpdateDTO,
  );
}

   
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                


  @Roles(userType.ADMIN)
  @UseGuards(AuthGuard)
  @Post('/approve/:id')
  async approveProduct(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProductEntity> {
    return await this.productsService.approveProductService(id);
  }

  @Roles(userType.ADMIN)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string, @User() user?:UserType): Promise<string> {

    try{
      //for finde creator of home with id in query
      const userCreator=await this.productsService.getUserIdByhomeId(id);
      //for check the creator prodcuts is equal to jwt request
      if(userCreator.id!==user.userId){
        throw new UnauthorizedException();
      }
  
      return await this.productsService.deleteProductService(id);

    }catch(error){
      throw new UnauthorizedException()
    }

  }
}
 