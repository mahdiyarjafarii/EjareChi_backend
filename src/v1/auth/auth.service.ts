import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/insfrastructure/prisma/prisma.service';
import { UserCreateReq, UserEntity } from './dtos/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService){}

    async creatUser({
        name,
        lastName,
        email ,
        password
    }:UserCreateReq
    ):Promise<UserEntity>{
        const passwordHash=await bcrypt.hash(password,10)
        const createduser=await this.prismaService.users.create({
            data:{
                name,
                lastName,
                email ,
                passwordHash 

            }
        });
        return new UserEntity(createduser);
    }

    async findeByEmail(email:string):Promise<UserEntity |undefined>{
        return this.prismaService.users.findFirst({
            where: {
                email:email ,
              },
        })
    }
}
