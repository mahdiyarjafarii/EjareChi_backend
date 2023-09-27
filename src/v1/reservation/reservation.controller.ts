import { Controller, Get, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';


@Controller({
    path: 'reserv',
    version: '1',
  })
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  getHello(): string {
    return "return";
  }
}
