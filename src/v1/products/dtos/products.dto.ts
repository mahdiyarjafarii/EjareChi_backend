import { IsOptional, IsEnum, IsNumber, IsString } from 'class-validator';
import { CategoriesType } from 'src/insfrastructure/global.type';

export class ProductCreateReq {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  //category: CategoriesType;
  @IsString()
  @IsOptional()
  category: CategoriesType;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  geoLocation?: string;

  @IsString()
  ownerID: string;
}

export class ProductUpdateReq {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  //category: CategoriesType;
  @IsString()
  @IsOptional()
  category: CategoriesType;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  geoLocation?: string;
}

export class ProductEntity {
  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  geoLocation: string;
  ownerID: string;
}
