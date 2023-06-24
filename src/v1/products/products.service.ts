import { Injectable } from '@nestjs/common';
import { ProductCreateReq } from './dtos/products.dto';
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
  }: ProductCreateReq): Promise<string> {
    const res = await this.prismaService.products.create({
      data: {
        name,
        category,
        description,
        geoLocation,
        ownerID,
        price,
      },
    });
    console.log({ res });

    return 'Hello World!';
  }
  async getAllProductsService() {
    const products = await this.prismaService.products.findMany();
    console.log({ products });
    return products;
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
