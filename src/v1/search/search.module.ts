import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Module({
  providers: [SearchService, ElasticsearchService],
  controllers: [SearchController],
})
export class SearchModule {}
