import { Controller, Get, Post } from '@nestjs/common';
import { CommentService } from './comment.service';


@Controller(
    {
        path: 'comment',
        version: '1',
      }
)
export class CommentController {
  constructor(private readonly commentservice: CommentService) {}

  @Get()
  async sendEmail() {
    return await this.commentservice.sendEmailService();
  }
}
