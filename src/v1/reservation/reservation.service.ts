import { Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ReservationsEntity, creatReservations } from './dto/reservatins.dto';
import { UserType } from '../decorators/user.decorator';


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
      const reservations = await this.prismaService.reservations.findMany({
        where: {
            ...searchQueryObj
        },
        include: {
            rental: {
                include: {
                    images: true
                }
            }
        }
    });
    
    if (reservations?.length) {
        return reservations.map((reservation) => new ReservationsEntity(reservation));
     }else{
       return [];
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

async deleteReservations(id:number,user:UserType){
    try{
       
        const reservations= await this.prismaService.reservations.findFirst({
             where:{reservations_id:id}
         }
         )
         if(reservations?.user_id !== user?.userId){
           return "not matchinh"
         }
    }catch(error){
        console.log(error)
    }

    try{
       await this.prismaService.reservations.delete({
            where:{
                reservations_id:id
            }
        })
        return `Reservations with id = ${id} deleted successfully`;
    }catch(error){
        console.log(error)
    }
    
}

}
