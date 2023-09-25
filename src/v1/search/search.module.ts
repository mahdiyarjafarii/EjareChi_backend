import { Module, OnModuleInit } from '@nestjs/common';
import { SearchController } from './search.controller';
// import { SearchService } from './search.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './search.service';

@Module({
  providers: [SearchService],
  controllers: [SearchController],
  imports: [
    ElasticsearchModule.register({
      // node: process.env.ELASTICSEARCH_URL,
      node: 'https://84.46.250.91:9200',
      ssl: {
        rejectUnauthorized: false,
        ca: '026329c9107a91f9c1b21398efbdcb33e93cea1e37582abe8a9d9d6e06a9ce96',
      },
      auth: {
        username: 'elastic',
        password: 'Lr=AUWucMa-DL2kPBA9J',
      },
    }),
  ],
  exports: [SearchService],
})
export class SearchModule implements OnModuleInit {
  constructor(private readonly searchService: SearchService) {}

  async onModuleInit() {
    // Execute code when the module is initialized
    await this.searchService.initiateElasticMapping(); // Run your service or custom logic here
  }
}
