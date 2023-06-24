import { Controller,Get,Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateReq, UserLoginReq } from './dtos/users.dto';
import { Body, Param } from '@nestjs/common/decorators';


@Controller({
    path: 'auth',
    version: '1',
  })
export class AuthController {

constructor(private readonly authServices:AuthService ){}
//for login api
@Get("/login")
loginUser(
    @Body() userLoginDto:UserLoginReq
){
   const existingUser=this.authServices.findeByEmail(userLoginDto.email);
   if(!existingUser){
    return { message: 'user is not found!' };
   }
   


}

//for signup api
@Post("signup")
async signUpUser(
    @Body() userCreatDTO:UserCreateReq ,
){
    const existingUser=this.authServices.findeByEmail(userCreatDTO.email);

    if(existingUser){
        return { message: 'Email already registered' };
    }



}


}
