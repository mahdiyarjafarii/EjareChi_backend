import { Controller,Get,Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateReq, UserLoginReq } from './dtos/users.dto';
import { Body } from '@nestjs/common/decorators';
import * as bcrypt from 'bcrypt';



@Controller({
    path: 'auth',
    version: '1',
  })
export class AuthController {

constructor(private readonly authServices:AuthService ){}
//for login api
@Post("login")
async loginUser(
    @Body() userLoginDto:UserLoginReq
){
   const existingUser=await this.authServices.findeByEmail(userLoginDto.email);
   if(!existingUser){
    return { message: 'user is not found!' };
   }
   const resultComapre= await bcrypt.compare(userLoginDto.password,existingUser.passwordHash );
   if(resultComapre){
    return { message: 'welcome to our site' };
   }else{
    return { message: 'password is not match' };
   }
   


}

//for signup api
@Post("signup")
async signUpUser(
    @Body() userCreatDTO:UserCreateReq ,
){
    const existingUser=await this.authServices.findeByEmail(userCreatDTO.email);
    if(existingUser){
        return { message: 'Email already registered' };
    }

    return await this.authServices.creatUser(userCreatDTO);


}


}
