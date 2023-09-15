import {
  Body,
  Param,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common/decorators';
import {
  Controller,
  ParseUUIDPipe,
  Get,
  Post,
  Delete,
  Put,
  UnauthorizedException,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { RentalService } from './rental.service';
import {
  RentalCreateReq,
  RentalEntity,
  RentalUpdateReq,
} from './dtos/rental.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { userType } from '@prisma/client';
import { User, UserType } from '../decorators/user.decorator';
import { Roles } from '../decorators/roles.decorator';
import * as multer from 'multer';
import { cwd } from 'process';
import { existsSync, mkdirSync } from 'fs';
//import { AuthGuard } from './auth.guard';

@Controller({
  path: 'rentals',
  version: '1',
})
export class RentalController {
  constructor(private readonly rentalService: RentalService) { }

  // @Roles(userType.NOTADMIN, userType.ADMIN)
  @Get()
  async getAllRental(
    @Query('approved') approvedStatus?: boolean,
    @User() user?: UserType,
  ): Promise<RentalEntity[]> {
    console.log(user);

    return await this.rentalService.getAllRentalsService(approvedStatus);
  }

  @Get('/categories')
  async getCategories(): Promise<any> {
    console.log();

    return await this.rentalService.getAllCategoriesService();
  }

  @Get('/categories-attributes')
  async getCategoryAttribute(
    @Query('category-id', ParseIntPipe) categoryID: number,
  ): Promise<any> {
    console.log();

    return await this.rentalService.getCategoryAttributesService(categoryID);
  }

  @Roles(userType.NOTADMIN, userType.ADMIN)
  @Get(':id')
  async getProductByID(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<RentalEntity> {
    return await this.rentalService.getRentalByIDService(id);
  }




  //@Roles(userType.NOTADMIN, userType.ADMIN)
  @Post('/create')
  @UseInterceptors(
    FilesInterceptor('images', 7, {
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          let destinationPath = `${cwd()}/uploads/${req.headers?.authorization}`
          
          if (!existsSync(destinationPath)){
            mkdirSync(destinationPath)
        }
          
          console.log(1,req.headers,file);
          
          cb(null, destinationPath)
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname)
        }
      })
    }),
  )
  async createRental(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() productDTO: RentalCreateReq,
    @User() user?: UserType,
  ): Promise<RentalEntity> {
    console.log({ images });
    console.log({ productDTO });
    let testID = "a7afb7d62e61"
    return await this.rentalService.createRentalService(
      productDTO,
      testID,
    );
  }

  @Roles(userType.NOTADMIN, userType.ADMIN)
  @Put('/update/:id')
  async updateRental(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productUpdateDTO: RentalUpdateReq,
    @User() user?: UserType,
  ): Promise<RentalEntity> {
    try {
      //for finde creator of home with id in query
      const userCreator = await this.rentalService.getUserIdByhomeId(id);
      //for check the creator prodcuts is equal to jwt request
      if (userCreator.user_id !== user.userId) {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
    return await this.rentalService.updateRentalService(id, productUpdateDTO);
  }

  @Roles(userType.ADMIN)
  @Post('/approve/:id')
  async approveRental(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<RentalEntity> {
    return await this.rentalService.approveRentalService(id);
  }

  @Roles(userType.NOTADMIN, userType.ADMIN)
  @Delete(':id')
  async deleteRental(
    @Param('id', ParseUUIDPipe) id: string,
    @User() user?: UserType,
  ): Promise<string> {
    try {
      //for finde creator of home with id in query
      const userCreator = await this.rentalService.getUserIdByhomeId(id);
      //for check the creator prodcuts is equal to jwt request
      if (userCreator.user_id !== user.userId) {
        throw new UnauthorizedException();
      }

      return await this.rentalService.deleteRentalService(id);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Post('/test')
  @UseInterceptors(
    FilesInterceptor('files', 7, {
      dest: './uploads',
    }),
  )
  async aaa(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() productDTO: RentalCreateReq,
  ): Promise<string> {
    console.log('productDTO', productDTO);
    console.log('files', files);

    return 'success'; //await this.RentalService.createRentalervice(productDTO);
  }
}
