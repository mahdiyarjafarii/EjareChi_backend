import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserType } from '../decorators/user.decorator';

@Controller(
    {
        path: 'user',
        version: '1',
      }
)
export class UserController {
  constructor(private readonly userService:UserService ) {}

  @Get(':userId')
  async getUserInfo(
    @Param('userId') userId: string,
    // @User() user?: UserType
  ) {
    return await this.userService.getUserInfoService(userId);
  }

  @Post(':userId/:rentalId')
  async updateUserFav(
    @Param('rentalId') rentalId: string,
    @Param('userId') userId: string,

    // @User() user?: UserType
  ){
    return await this.userService.updateFavService(userId,rentalId)
  }

  @Delete(':serId/:rentalId')
  async deleteUserFav(
    @Param('rentalId') rentalId: string,
    @Param('userId') userId: string,


    // @User() user?: UserType
  ){
    return await this.userService.deleteFavService(userId,rentalId)
  }
}
