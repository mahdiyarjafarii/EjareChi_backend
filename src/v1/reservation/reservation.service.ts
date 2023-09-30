import { Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ReservationsEntity, creatReservations } from './dto/reservatins.dto';

@Injectable()
export class ReservationService {

constructor(private readonly prismaService: PrismaService) {}

async getAllReservations(
    userId :string,
    rentalId:string,
    approvedStatus:boolean
): Promise<ReservationsEntity[]>{
    const searchQueryObj = {
        ...(approvedStatus && {
            approve: approvedStatus,
        }),
        ...(userId && { user_id:userId}),
        ...(rentalId && { rental_id:rentalId})
      };
    const reservations=await this.prismaService.reservations.findMany({
        where:{
            ...searchQueryObj
        }
    }) 

    if (reservations?.length) {
        return reservations.map((reservation) => new ReservationsEntity(reservation));
     }else{
        throw new HttpException('Prodcuts Not Found', HttpStatus.NOT_FOUND);
     }
}


async  createReservationService({
    startDate,
    endDate,
    totalPrice,
    rental_id
}:creatReservations,user_id:string):Promise<ReservationsEntity>{
 const createdReservations= await this.prismaService.reservations.create({
    data:{
        startDate,
        endDate,
        totalPrice,
        user_id,
        rental_id
    }
 })    
 
 return new ReservationsEntity(createdReservations)
}



}
