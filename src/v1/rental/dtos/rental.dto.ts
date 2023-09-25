import {
  IsOptional,
  IsEnum,
  IsNumber,
  IsString,
  IsArray,
  Min,
  Max,
} from 'class-validator';
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
  longitude?: number;

  // @IsString()
  // user_id: string

  @IsArray()
  @IsOptional()
  images: string[];

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Minimum value is 1' }) // Set the minimum value (0 in this example)
  @Max(100, { message: 'Maximum value is 6' }) // Set the maximum value (100 in this example)
  Strictness_number?: number;
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
  longitude?: number;

  @IsNumber()
  @Min(0, { message: 'Minimum value is 1' }) // Set the minimum value (0 in this example)
  @Max(100, { message: 'Maximum value is 6' }) // Set the maximum value (100 in this example)
  Strictness_number: number;
}

export class RentalEntity {
  constructor(partial: Partial<RentalEntity>) {
    Object.assign(this, partial);
  }
  rental_id: string;
  name: string;
  description: string;
  latitude?: number;
  longitude?: number;
  price: number;
  user_id: string;
  images: any[];
  Strictness_number:number;
  user?: {
    name : string;
    lastName: string;
    email :string;
  };
  category?: any;
}

