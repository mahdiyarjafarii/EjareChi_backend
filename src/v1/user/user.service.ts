import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService){}
  async getUserInfoService(userId:string) {
    try{
      return await this.prismaService.users.findUnique({
        where:{
            user_id:userId
        }
    })
    }catch(error){
      return {}
    }

  }
  async getUserFavService(userId:string) {
    const user= await this.prismaService.users.findUnique({
        where:{
            user_id:userId
        }
    });

    const favoritesListing=await this.prismaService.rentals.findMany({
      where:{
        rental_id:{
          in:[...(user.favoriteIds ||[])]
        }
      },
      include: {
        images: true 
    }
    })

    return favoritesListing
  }
  async updateFavService(
    userId:string,
    rentalId:string
  ){
    const user=await this.prismaService.users.findUnique({
      where:{
        user_id:userId
      }
    });

    let favoriteIds=[...(user.favoriteIds || [])];
    favoriteIds.push(rentalId);
    

    
    const updatedUser = await this.prismaService.users.update({
      where: {
       user_id:userId
      },
      data: {
        favoriteIds
      }
    });
    return updatedUser;

  }
  async deleteFavService(
    userId:string,
    rentalId:string
  ){
    const user=await this.prismaService.users.findUnique({
      where:{
        user_id:userId
      }
    });

    let favoriteIds=[...(user.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== rentalId);


    const updatedUser = await this.prismaService.users.update({
      where: {
       user_id:userId
      },
      data: {
        favoriteIds
      }
    });

        return updatedUser;



  }
}
