import { CategoriesType } from 'src/insfrastructure/global.type';

export class ProductCreateReq {
  name: string;
  description?: string;
  category: CategoriesType;
  price: number;
  geoLocation?: string;
  ownerID: string;
}
