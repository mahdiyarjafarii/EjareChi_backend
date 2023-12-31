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
  ParseFloatPipe,
} from '@nestjs/common';
import { RentalService } from './rental.service';
import {
  RentalCreateReq,
  RentalEntity,
  RentalUpdateReq,
} from './dtos/rental.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

import { User, UserType } from '../decorators/user.decorator';
import { Roles } from '../decorators/roles.decorator';
import * as multer from 'multer';
import { cwd } from 'process';
import { existsSync, mkdirSync, renameSync } from 'fs';
import { SearchService } from '../search/search.service';
import sharp from 'sharp';
import { ParseLimitPipe } from './pipes/parseLimit.pipe';
//import { AuthGuard } from './auth.guard';

@Controller({
  path: 'rentals',
  version: '1',
})
export class RentalController {
  constructor(
    private readonly rentalService: RentalService,
    private readonly searchService: SearchService,
  ) {}

  // @Roles(userType.NOTADMIN, userType.ADMIN)
  @Get()
  async getAllRental(
    @Query('approved') approvedStatus?: boolean,
    @Query('category') categoryName?: string,
    @Query('lat') mapLatitude?: number,
    @Query('lng') mapLongitude?: number,
    @Query('zoom') zoom?: number,
    @Query('userId') userId?: string,
    @Query('maxLat') maxLat?: number,
    @Query('minLat') minLat?: number,
    @Query('maxLng') maxLng?: number,
    @Query('minLng') minLng?: number,
    @Query("limit" , new ParseLimitPipe(0)) limit?: number,
    @Query("page" , new ParseLimitPipe(1)) page?: number,
    @User() user?: UserType,
  ): Promise<RentalEntity[]> {
    // console.log({limit,page});
    
    return await this.rentalService.getAllRentalsService(
      approvedStatus,
      categoryName,
      mapLatitude,
      mapLongitude,
      zoom,
      {
        maxLat,
        minLat,
        maxLng,
        minLng,
      },
      limit,
      page,
      userId,
    );
  }

  @Get('/categories')
  async getCategories(): Promise<any> {
    return await this.rentalService.getAllCategoriesService();
  }

  @Get('/category-attributes')
  async getCategoryAttribute(
    @Query('category-id', ParseIntPipe) categoryID: number,
  ): Promise<any> {
    return await this.rentalService.getCategoryAttributesService(categoryID);
  }

  // @Roles(userType.NOTADMIN, userType.ADMIN)
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
          console.log(file,cb)
          const destinationPath = `${cwd()}/uploads/tmp`;

          if (!existsSync(destinationPath)) {
            mkdirSync(destinationPath);
          }

          cb(null, destinationPath);
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async createRental(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() productDTO: RentalCreateReq,
    @User() user?: UserType,
  ): Promise<RentalEntity> {
    console.log( images ,"tt");
    // console.log({ productDTO });
    // console.log(user)
    // const testID = '80678f63-3571-4941-8887-a7afb7d62e61';

    const dbRes = await this.rentalService.createRentalService(
      productDTO,
      user.userId,
    );
    //console.log({dbRes});

    await this.searchService.createSearchDocument({
      id: dbRes.rental_id,
      body: {
        name: dbRes.name,
        description: dbRes.description,
        category: dbRes?.category?.name,
        username: dbRes?.user?.name,
      },
    });

    if (images?.length) {
      // for (const image of images) {
      //   const outputPath = `${cwd()}/uploads/tmp/${image.filename}`;

      //   await sharp(image.path).webp({ quality: 80 }).toFile(outputPath);
      // }

      await this.rentalService.writeImagePathToDB(images, dbRes.rental_id);
      renameSync(`${cwd()}/uploads/tmp`, `${cwd()}/uploads/${dbRes.rental_id}`);
    }

    return dbRes;
  }

  // @Roles(userType.NOTADMIN, userType.ADMIN)
  @Put('/update/:id')
  async updateRental(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productUpdateDTO: RentalUpdateReq,
    @User() user?: UserType,
  ) {

    // try {
    //   //for finde creator of home with id in query
    //   const userCreator = await this.rentalService.getUserIdByhomeId(id);
    //   //for check the creator prodcuts is equal to jwt request
    //   if (userCreator.user_id !== user.userId) {
    //     throw new UnauthorizedException();
    //   }
    // } catch (error) {
    //   throw new UnauthorizedException();
    // }
    return await this.rentalService.updateRentalService(id, productUpdateDTO);
  }

  // @Roles(userType.ADMIN)
  @Post('/approve/:id')
  async approveRental(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<RentalEntity> {
    return await this.rentalService.approveRentalService(id);
  }

  // @Roles(userType.NOTADMIN, userType.ADMIN)
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
        console.log('ttt');
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
