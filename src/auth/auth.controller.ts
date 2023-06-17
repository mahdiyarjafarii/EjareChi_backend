import { Controller,Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { log } from 'console';


@Controller('/v1/auth')
export class AuthController { 
    constructor(private authService:AuthService){}

     @Get()
     getUser(){
        return  this.authService.sayHello()
     }


     @Post("signup")
     creatUser(@Req() req:Request,@Res() res:Response){
        
     }

}
 