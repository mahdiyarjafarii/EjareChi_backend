import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateReq } from './dtos/users.dto';
import { Body, Param } from '@nestjs/common/decorators';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authServices: AuthService) {}
  //for login api
  @Get('/login')
  loginUser() {
    return 'test login';
  }

  //for signup api
  @Post('signup')
  async signUpUser(@Body() userDTO: UserCreateReq) {
    return await this.authServices.creatUser(userDTO);
  }
}
