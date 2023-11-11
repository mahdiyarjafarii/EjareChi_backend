import { Module } from '@nestjs/common';
import ClsContextStorageService, {
  ContextStorageServiceKey,
} from './context.service';

@Module({
  providers: [ClsContextStorageService],
  exports: [ClsContextStorageService, ContextStorageServiceKey],
})
export class CLSModule {}
