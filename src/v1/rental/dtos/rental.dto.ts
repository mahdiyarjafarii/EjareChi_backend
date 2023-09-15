import { IsOptional, IsEnum, IsNumber, IsString, IsArray } from 'class-validator';
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

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number

  // @IsString()
  // user_id: string

  @IsArray()
  @IsOptional()
  images: string[]
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

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number
}

export class RentalEntity {
  constructor(partial: Partial<RentalEntity>) {
    Object.assign(this, partial);
  }
  rental_id: string;
  name: string;
  description: string;
  latitude?: number;
  longitude?: number
  price: number;
  user_id: string;
}
