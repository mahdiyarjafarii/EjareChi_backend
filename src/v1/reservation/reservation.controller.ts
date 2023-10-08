import { Body, Controller, Delete, Get, Param, Post,Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationsEntity, creatReservations } from './dto/reservatins.dto';
import { User, UserType } from '../decorators/user.decorator';
import { log } from 'console';



@Controller({
    path: 'reserv',
    version: '1',
  })
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async getAllReservations(
    @Query('user_id') userId?:string, 
    @Query('rental_id') rentalId?:string,
    @Query('approved') approvedStatus?: boolean,
    @Query('author_id') authorId?: string,

    

  ) {
   return this.reservationService.getAllReservations(
      userId,
      rentalId,
      authorId,
      approvedStatus,
    )
  }


  @Post('/create')
  async creatReservations(
    @User() user:any,
    @Body() reservationsDTO:creatReservations
  ){
    return this.reservationService.createReservationService(reservationsDTO,user?.userId)
  }
  @Delete(':id')
  async deleteReservation(
    @Param('id') id: number,
    @User() user?: UserType,
  ){
    return  await this.reservationService.deleteReservations(id,user)
  }
}
