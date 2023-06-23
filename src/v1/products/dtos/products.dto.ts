import { IsOptional , IsEnum , IsNumber} from 'class-validator';
import { CategoriesType } from 'src/insfrastructure/global.type';

export class ProductCreateReq {
  name: string;

  @IsOptional()
  description?: string;

  category: CategoriesType;

  @IsNumber()
  price: number;

  geoLocation?: string;
  ownerID: string;
}
