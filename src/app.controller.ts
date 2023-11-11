import { Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { ClsService } from 'nestjs-cls';
import ClsContextStorageService, {
  ContextStorageServiceKey,
} from './infrastructure/context/context.service';
//import { ClsService } from 'nestjs-cls';
//import ClsContextStorageService from './infrastructure/context/context.service';

@Controller()
export class AppController {
  constructor(
    @Inject(ContextStorageServiceKey)
    private readonly cls: ClsContextStorageService,
    private readonly appService: AppService, //private readonly cls: ClsContextStorageService
  ) {}

  @Get()
  getHello(@Req() req: Request): string {
    //console.log({"headers":this.cls.getContextId()});
    console.log(123, this.cls.getContextId());

    return this.appService.getHello();
  }
}
