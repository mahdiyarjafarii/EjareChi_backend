import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
//import { ClsService } from 'nestjs-cls';
//import ClsContextStorageService from './infrastructure/context/context.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService , 
    //private readonly cls: ClsContextStorageService
    ) {}

  @Get()
  getHello(
    @Req() req:Request
  ): string {
    //console.log({"headers":this.cls.getContextId()});
    
    return this.appService.getHello();
  }
}
