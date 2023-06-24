import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/insfrastructure/prisma/prisma.service';
import { UserCreateReq } from './dtos/users.dto';

@Injectable()
export class AuthService {
    // constructor(private readonly prismaService: PrismaService){}

    async creatUser({
        name,
        lastName,
        email ,
        password
    }:UserCreateReq
    ){
    console.log({
        name,
        lastName,
        email
        ,password 
    })
    }
}
