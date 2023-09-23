import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ESSearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
}
