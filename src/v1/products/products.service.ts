import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ProductCreateReq, ProductEntity } from './dtos/products.dto';
import { PrismaService } from 'src/insfrastructure/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProductService({
    name,
    description,
    price,
    category,
    geoLocation,
    ownerID,
  }: ProductCreateReq): Promise<ProductEntity> {
    console.log({
      name,
      description,
      price,
      category,
      geoLocation,
      ownerID,
    });

    const createdProduct = await this.prismaService.products.create({
      data: {
        name,
        category,
        description,
        geoLocation,
        ownerID,
        price,
      },
    });

    return new ProductEntity(createdProduct);
  }
  async getAllProductsService(): Promise<ProductEntity[]> {
    const products = await this.prismaService.products.findMany();

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
    {
      description,
      price,
      category,
      geoLocation,
    }: Partial<Omit<ProductCreateReq, 'id' | 'ownerID'>>,
  ) {
    return this.prismaService.products.update({
      where: {
        id: id,
      },
      data: {
        category,
        description,
        geoLocation,
        price,
      },
    });
  }
  async deleteProductService(id: string) {
    return this.prismaService.products.delete({
      where: {
        id: id,
      },
    });
  }
}
