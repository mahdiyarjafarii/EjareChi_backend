import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.register({
      // node: process.env.ELASTICSEARCH_URL,
      node: 'https://84.46.250.91:9200',
      auth: {
        username: 'elastic',
        password: 'Lr=AUWucMa-DL2kPBA9J',
      },
    }),
  ],
})
export class ESSearchModule {}
