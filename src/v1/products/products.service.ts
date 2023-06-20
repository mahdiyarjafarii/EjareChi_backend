import { Injectable } from '@nestjs/common';
import { ProductCreateReq } from './dtos/products.dto';

@Injectable()
export class ProductsService {
  createProductService(createProductDTO: ProductCreateReq): string {
    return 'Hello World!';
  }
}
