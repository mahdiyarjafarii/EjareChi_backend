import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { MailController } from "./mail.controller";
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
        useFactory: async () =>({
            transport:{
                host:"smtp.gmail.com",
                auth:{
                    user:"mahdiyarjfr@gmail.com",
                    pass:"Mahdiyar138080@"
                }
            }
        })
    })
  ],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule {}
