import { Injectable, Inject  } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { UserCreateReq, UserEntity } from './dtos/users.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Redis } from 'ioredis';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService:JwtService,
        @Inject('REDIS_CLIENT') private readonly redisClient: Redis
        ){}

    async creatUser({
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

    async generateToken(userId:string):Promise<string>{
        const payload = { sub: userId };
        return await this.jwtService.signAsync(payload)
    }

    async setTokenRedis(key:string,token:string):Promise<string>{
        try{
            const cachedData = await this.redisClient.set(key,token);
            const expireResult = await this.redisClient.expire(key, 84600);
        
    
            return cachedData
        }catch(e){
            console.error(e)
        }

    
          
       
    }


    async getTokenRedis(key:string):Promise<string>{
        try{
            const cachedData = await this.redisClient.get(key)
    
            return cachedData
        }catch(e){
            console.error(e)
        }

    }
}
