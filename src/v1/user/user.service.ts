import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService){}
  async getUserInfoService(userId:string) {
    return await this.prismaService.users.findUnique({
        where:{
            user_id:userId
        }
    })
  }
}
