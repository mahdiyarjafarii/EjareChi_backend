import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ESSearchModule } from 'src/infrastructure/elasticsearch/elasticsearch.module';

@Module({
  imports: [ESSearchModule],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
