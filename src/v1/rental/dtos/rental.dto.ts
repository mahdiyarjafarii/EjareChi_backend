import { IsOptional, IsEnum, IsNumber, IsString } from 'class-validator';
import { CategoriesType } from 'src/infrastructure/global.type';

export class RentalCreateReq {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  //category: CategoriesType;
  @IsNumber()
  @IsOptional()
  category_id: number;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  geoLocation?: string;
}

export class RentalUpdateReq {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  //category: CategoriesType;
  @IsNumber()
  @IsOptional()
  category_id: number;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  geoLocation?: string;
}

export class RentalEntity {
  constructor(partial: Partial<RentalEntity>) {
    Object.assign(this, partial);
  }
  id: string;
  name: string;
  description: string;
  category_id: number;
  price: number;
  latitude: number;
  longitude: number;
  ownerID: string;
}
