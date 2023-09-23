import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async test() {
    const res = await this.elasticsearchService.index({
      index: 'test',
      body: {
        id: '1',
        document: {
          character: 'Ned Stark',
          quote: 'Winter is coming.',
        },
      },
    });
    console.log({ res });
  }
}
