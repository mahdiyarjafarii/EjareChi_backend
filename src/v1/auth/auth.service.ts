import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/insfrastructure/prisma/prisma.service';
import { UserCreateReq, UserEntity } from './dtos/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService){}

    async  creatUser({
        name,
        lastName,
        email ,
        password
    }:UserCreateReq
    ):Promise<UserEntity>{
        console.log({
            name,
            lastName,
            email,
            password
        })

        try{
            const passwordHash=await bcrypt.hash(password,process.env.SALT_BCRYPT)
            const createduser=await this.prismaService.users.create({
                data:{
                    name,
                    lastName,
                    email ,
                    passwordHash 
    
                }
            });
            return new UserEntity(createduser);
        }catch(error){
            console.log(error)
            throw new Error(error);
        }
        // console.log(process.env.SALT_BCRYPT)
 
    }

    async findeByEmail(email:string):Promise<UserEntity |undefined>{
        return this.prismaService.users.findFirst({
            where: {
                email:email ,
              },
        })
    }
}
