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
      Strictness_number,
    }: RentalCreateReq,
    user_id: string,
  ): Promise<RentalEntity> {
    // console.log({
    //   name,
    //   description,
    //   price,
    //   category_id,
    //   latitude,
    //   longitude,
    //   user_id,
    // });

    const createdRental = await this.prismaService.rentals.create({
      data: {
        name,
        price,
        description,
        Strictness_number,
        latitude,
        longitude,
        user: { connect: { user_id } },
        category: { connect: { category_id } },
      },
      include: {
        user: true,
        category: true,
      },
    });

    return new RentalEntity(createdRental);
  }
  async getAllRentalsService(
    approvedStatus?: boolean,
    categoryName?: string,
    mapLatitude?: number,
    mapLongitude?: number,
    zoom?: number,
    userId?:string
  ): Promise<RentalEntity[]> {
    console.log({zoom});
    
    const lngTolerance = 180 / Math.pow(2, 2 * (zoom - 10));
    console.log({lngTolerance});
    
    const latTolerance = lngTolerance / 2;

    const searchQueryObj = {
      ...(approvedStatus && {
        approved: approvedStatus,
      }),
      ...(categoryName && { category: { query_name: categoryName } }),
      ...(userId && {
        user_id:userId
      })
    };

    const latQueryObj = {
      ...(mapLatitude && {
        latitude: {
          gte: mapLatitude - latTolerance,
          lte: mapLatitude + latTolerance,
        },
      }),
    };

    const lngQueryObj = {
      ...(mapLongitude && {
        longitude: {
          gte: mapLongitude - lngTolerance,
          lte: mapLongitude + lngTolerance,
        },
      }),
    };

    const Rentals = await this.prismaService.rentals.findMany({
      //include is used for doing JOINS
      include: {
        images: {
          select: {
            image_data: true,
          },
        },
        category: {
          select: {
            icon_name: true,
          },
        },
      },
      where: {
        ...searchQueryObj,
        AND: [lngQueryObj, latQueryObj],
      },
    });
    console.log(Rentals?.length);
    
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
      include: {
        user: true,
      },
    });

    if (Rental) {
      const rentalEntity = new RentalEntity(Rental);

      if (Rental.user) {
        rentalEntity.user = {
          name: Rental.user.name,
          lastName: Rental.user.lastName,
          email: Rental.user.email,
        };
      }

      return rentalEntity;
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
  async writeImagePathToDB(
    images: Array<Express.Multer.File>,
    rentalID: string,
  ) {
    //TODO : change prime key of images table for ignoring repetitive inserts
    const dbRes = await this.prismaService.rentalImages.createMany({
      data: images.map((image: Express.Multer.File) => {
        return {
          rental_id: rentalID,
          image_data: `http://http://localhost:9000/uploads/${rentalID}/${image.filename}`,
        };
      }),
    });
    return true;
  }
}
