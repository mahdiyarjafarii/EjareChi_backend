import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import {
  RentalCreateReq,
  RentalEntity,
  RentalUpdateReq,
} from './dtos/rental.dto';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class RentalService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRentalService(
    {
      name,
      description,
      price,
      category_id,
      latitude,
      longitude,
    }: RentalCreateReq,
    user_id: string,
  ): Promise<RentalEntity> {
    console.log({
      name,
      description,
      price,
      category_id,
      latitude,
      longitude,
      user_id,
    });

    const createdRental = await this.prismaService.rentals.create({
      data: {
        name,
        price,
        description,
        user: { connect: { user_id } },
        category: { connect: { category_id } },
      },
    });

    return new RentalEntity(createdRental);
  }
  async getAllRentalsService(
    approvedStatus?: boolean,
    categoryName?: string,
  ): Promise<RentalEntity[]> {
    const searchQueryObj = {
      ...(approvedStatus && {
        approved: approvedStatus,
      }),
      ...(categoryName && { category: { query_name: categoryName } }),
    };
    console.log(searchQueryObj)

    const Rentals = await this.prismaService.rentals.findMany({
      //include is used for doing JOINS
      include:{
        images:{
          select:{
            image_data:true
          }
        }
      },
      where: searchQueryObj,
    });
    console.log({Rentals});
    

    if (Rentals?.length) {
      return Rentals.map((Rental) => new RentalEntity(Rental));
    } else {
      throw new HttpException('Prodcuts Not Found', HttpStatus.NOT_FOUND);
    }
  }
  async getRentalByIDService(id: string): Promise<RentalEntity> {
    const Rental = await this.prismaService.rentals.findFirst({
      where: {
        rental_id: id,
      },
    });

    if (Rental) {
      return new RentalEntity(Rental);
    } else {
      throw new HttpException(
        `Prodcut with id#${id} Not Found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async updateRentalService(
    id: string,
    {
      name,
      description,
      price,
      category_id,
      latitude,
      longitude,
    }: RentalUpdateReq,
  ) {
    try {
      const Rental = await this.prismaService.rentals.update({
        where: {
          rental_id: id,
        },
        data: {
          name,
          category_id,
          description,
          latitude,
          longitude,
          price,
        },
      });
      return new RentalEntity(Rental);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async approveRentalService(id: string) {
    try {
      const Rental = await this.prismaService.rentals.update({
        where: {
          rental_id: id,
        },
        data: {
          approved: true,
        },
      });
      return new RentalEntity(Rental);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async deleteRentalService(id: string): Promise<string> {
    try {
      await this.prismaService.rentals.delete({
        where: {
          rental_id: id,
        },
      });
      return `Rental with id = ${id} deleted successfully`;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async getUserIdByhomeId(id: string) {
    const user = await this.prismaService.rentals.findUnique({
      where: {
        rental_id: id,
      },
      select: {
        user: {
          select: {
            name: true,
            user_id: true,
            email: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException();
    }
    return user.user;
  }
  async getAllCategoriesService() {
    const dbCategories = await this.prismaService.category.findMany({});
    return dbCategories;
  }
  async getCategoryAttributesService(categoryID: number) {
    const dbAttributes = await this.prismaService.categoryAttribute.findMany({
      where: {
        categoryId: categoryID,
      },
    });
    return dbAttributes;
  }
  async writeImagePathToDB(images:Array<Express.Multer.File> , rentalID:string) {
    //TODO : change prime key of images table for ignoring repetitive inserts
    let dbRes = await this.prismaService.rentalImages.createMany({
      data:images.map((image:Express.Multer.File)=>{
        return{
          rental_id: rentalID,
          image_data: image.filename,          
        }
      })
    })
    return true
  }
}
