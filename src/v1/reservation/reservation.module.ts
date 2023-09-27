import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module'; 
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';


@Module({
  imports: [PrismaModule],
  providers: [ReservationService],
  controllers: [ReservationController]
})
export class ReservationModule {}
