import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  ProductCreateReq,
  ProductEntity,
  ProductUpdateReq,
} from './dtos/products.dto';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProductService({
    name,
    description,
    price,
    category,
    geoLocation,
    user_id,
  }: ProductCreateReq): Promise<ProductEntity> {
    console.log({
      name,
      description,
      price,
      category,
      geoLocation,
      user_id,
    });

    const createdProduct = await this.prismaService.products.create({
      data: {
        name,
        category,
        description,
        geoLocation,
        user_id ,
        price,
      },
    });

    return new ProductEntity(createdProduct);
  }
  async getAllProductsService(
    approvedStatus?: boolean,
  ): Promise<ProductEntity[]> {
    const searchQueryObj = {
      ...(approvedStatus && {
        approved: approvedStatus,
      }),
    };

    const products = await this.prismaService.products.findMany({
      where: searchQueryObj,
    });

    if (products?.length) {
      return products.map((product) => new ProductEntity(product));
    } else {
      throw new HttpException('Prodcuts Not Found', HttpStatus.NOT_FOUND);
    }
  }
  async getProductByIDService(id: string): Promise<ProductEntity> {
    const product = await this.prismaService.products.findFirst({
      where: {
        id: id,
      },
    });

    if (product) {
      return new ProductEntity(product);
    } else {
      throw new HttpException(
        `Prodcut with id#${id} Not Found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async updateProductService(
    id: string,
    { name, description, price, category, geoLocation }: ProductUpdateReq,
  ) {
    try {
      const product = await this.prismaService.products.update({
        where: {
          id: id,
        },
        data: {
          name,
          category,
          description,
          geoLocation,
          price,
        },
      });
      return new ProductEntity(product);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async approveProductService(id: string) {
    try {
      const product = await this.prismaService.products.update({
        where: {
          id: id,
        },
        data: {
          approved: true,
        },
      });
      return new ProductEntity(product);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async deleteProductService(id: string): Promise<string> {
    try {
      await this.prismaService.products.delete({
        where: {
          id: id,
        },
      });
      return `Product with id = ${id} deleted successfully`;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
