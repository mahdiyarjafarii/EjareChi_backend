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
    { name, description, price, category, geoLocation }: RentalCreateReq,
    user_id: string,
  ): Promise<RentalEntity> {
    console.log({
      name,
      description,
      price,
      category,
      geoLocation,
      user_id,
    });

    const createdRental = await this.prismaService.rentals.create({
      data: {
        name,
        category,
        description,
        geoLocation,
        user_id,
        price,
      },
    });

    return new RentalEntity(createdRental);
  }
  async getAllRentalsService(
    approvedStatus?: boolean,
  ): Promise<RentalEntity[]> {
    const searchQueryObj = {
      ...(approvedStatus && {
        approved: approvedStatus,
      }),
    };

    const Rentals = await this.prismaService.rentals.findMany({
      where: searchQueryObj,
    });

    if (Rentals?.length) {
      return Rentals.map((Rental) => new RentalEntity(Rental));
    } else {
      throw new HttpException('Prodcuts Not Found', HttpStatus.NOT_FOUND);
    }
  }
  async getRentalByIDService(id: string): Promise<RentalEntity> {
    const Rental = await this.prismaService.rentals.findFirst({
      where: {
        id: id,
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
    { name, description, price, category, geoLocation }: RentalUpdateReq,
  ) {
    try {
      const Rental = await this.prismaService.rentals.update({
        where: {
          id: id,
        },
        data: {
          name,
          category,
          description,
          geoLocation,
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
          id: id,
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
          id: id,
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
        id,
      },
      select: {
        user: {
          select: {
            name: true,
            id: true,
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
}
