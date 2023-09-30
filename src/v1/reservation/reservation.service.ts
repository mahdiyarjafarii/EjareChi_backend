import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ReservationsEntity, creatReservations } from './dto/reservatins.dto';

@Injectable()
export class ReservationService {

constructor(private readonly prismaService: PrismaService) {}

async getAllReservations(){
 
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
