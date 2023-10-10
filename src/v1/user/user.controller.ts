import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller(
    {
        path: 'user',
        version: '1',
      }
)
export class UserController {
  constructor(private readonly userService:UserService ) {}

  @Get(`:userId`)
  async getUserInfo(
    @Param('userId') userId: string,
  ) {
    return await this.userService.getUserInfoService(userId);
  }
}
