import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseLimitPipe implements PipeTransform<string, number> {
  constructor(
    private readonly userInput:number
  ){

  }
  transform(value: string, metadata: ArgumentMetadata): number {
    const parsedLimit = value ? parseInt(value, 10) : this.userInput;

    if (isNaN(parsedLimit)) {
      throw new BadRequestException('Invalid limit parameter. Numeric string is expected.');
    }

    return parsedLimit;
  }
}