import { IsBoolean, IsDate, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";





export class creatReservations{

    @IsDate()
    startDate: Date;
  
    @IsDate()
    endDate: Date;

    @IsOptional()
    @IsNumber()
    totalPrice: number;

    @IsOptional()
    @IsBoolean()
    approve?: boolean;
  
    @IsOptional()
    @IsString()
    user_id?: string;
  
    @IsString()
    rental_id: string;

}



export class ReservationsEntity{
    constructor(partial: Partial<ReservationsEntity>) {
        Object.assign(this, partial);
      }
      reservations_id: number;
      startDate: Date;
      endDate: Date;
      created_at: Date;
      updated_at: Date;
      totalPrice: number;
      approve: boolean;
      user_id: string;
      rental_id: string;

}