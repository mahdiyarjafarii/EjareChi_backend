import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  @Get()
  async searchDocumnets(@Query('q') query: string) {
    console.log(encodeURI(query));

    return await this.searchService.searchDocumentService(query);
  }
}
