import { ClsModule } from "nestjs-cls";
import ClsContextStorageService, { ContextStorageServiceKey } from "./cls.service";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) => req.headers['x-correlation-id'] ?? v4(),
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: ContextStorageServiceKey,
      useClass: ClsContextStorageService,
    },
  ],
  exports: [ContextStorageServiceKey],
})
export class ContextModule {}