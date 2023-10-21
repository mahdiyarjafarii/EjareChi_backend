import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailservices:MailerService){}
  async sendEmailService(){
    this.mailservices.sendMail({
        to:"rezajafari1973@gmail.com",
        from:"mahdiyarjfr@gmail.com",
        text:"khosh amadid",
        html:"<b>welcome<b/>"
    })
  }
}
