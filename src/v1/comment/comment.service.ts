import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class CommentService {
    
  async sendEmailService(){
   console.log("ssdsd")
  }
}
