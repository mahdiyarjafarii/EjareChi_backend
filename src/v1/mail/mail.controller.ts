import { Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller(
    {
        path: 'email',
        version: '1',
      }
)
export class MailController {
  constructor(private readonly mailservice: MailService) {}

  @Get()
  async sendEmail() {
    return await this.mailservice.sendEmailService();
  }
}
