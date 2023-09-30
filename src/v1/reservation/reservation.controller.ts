import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationsEntity, creatReservations } from './dto/reservatins.dto';
import { userType } from '@prisma/client';
import { User } from '../decorators/user.decorator';
import { log } from 'console';



@Controller({
    path: 'reserv',
    version: '1',
  })
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async getAllReservations(

  ) {
    this.reservationService.getAllReservations()
  }


  @Post('/create')
  async creatReservations(
    @User() user:any,
    @Body() reservationsDTO:creatReservations
  ){
    return this.reservationService.createReservationService(reservationsDTO,user?.userId)
  }
}
