import { IsOptional, IsEnum, IsNumber, IsString } from 'class-validator';
import { CategoriesType } from 'src/infrastructure/global.type';

export class RentalCreateReq {
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
}

export class RentalUpdateReq {
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

export class RentalEntity {
  constructor(partial: Partial<RentalEntity>) {
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
