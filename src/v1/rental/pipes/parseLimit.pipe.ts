import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseLimitPipe implements PipeTransform<string, number> {
  constructor(
    private readonly userInput:number
  ){

  }
  transform(value: string, metadata: ArgumentMetadata): number {
    if (value === undefined || value === null) {
      return 0; // Return 0 when value is not provided
    }
  
    
    const parsedLimit = !isNaN(+value) ? parseInt(value, 10)  : this.userInput;

    if (isNaN(parsedLimit)) {
      throw new BadRequestException('Invalid limit parameter. Numeric string is expected.');
    }

    return parsedLimit;
  }
}