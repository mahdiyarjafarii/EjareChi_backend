import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { userType } from "@prisma/client";
import * as jwt from "jsonwebtoken"
import { PrismaService } from "src/infrastructure/prisma/prisma.service";

interface payloadJWT{
   
        userId: string,
        user_type:userType,
        iat: number,
        exp: number
      
}


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly reflector:Reflector,private readonly prismaservice:PrismaService){}

    async canActivate(context:ExecutionContext){
        const roles=this.reflector.getAllAndOverride("roles",[
            context.getHandler(),
            context.getClass()
        ])
     

        if(roles?.length){
           
            const request=context.switchToHttp().getRequest(); 
            const token=request.headers?.authorization?.split("Bearer ")[1]
            try{
              const payload= await jwt.verify(token,process.env.JWT_SECRET) as payloadJWT;
              const user=await this.prismaservice.users.findUnique({
                where:{
                    user_id:payload.userId
                }
              });

              if(!user) return false;

              if(roles.includes(user.user_type)){
                return true;
              } 

           
              return false;
            }catch(error){
                console.log(error)
                return false;
            }
        }
        return true;
    }
}