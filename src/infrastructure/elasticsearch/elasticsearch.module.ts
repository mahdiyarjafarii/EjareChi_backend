import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  // imports: [
  //   ElasticsearchModule.register({
  //     // node: process.env.ELASTICSEARCH_URL,
  //     node: 'https://84.46.250.91:9200',
  //     ssl: {
  //       rejectUnauthorized: false,
  //       ca: '026329c9107a91f9c1b21398efbdcb33e93cea1e37582abe8a9d9d6e06a9ce96',
  //     },
  //     auth: {
  //       username: 'elastic',
  //       password: 'Lr=AUWucMa-DL2kPBA9J',
  //     },
  //   }),
  // ],
})
export class ESSearchModule {}
