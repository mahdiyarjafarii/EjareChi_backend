import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  private readonly RENTALS_INDEX: string;

  constructor(private readonly elasticsearchService: ElasticsearchService) {
    this.RENTALS_INDEX = 'rentals';
  }

  async initiateElasticMapping() {
    // await this.elasticsearchService.indices.delete({
    //   index:this.RENTALS_INDEX
    // })

    const indexExists = await this.elasticsearchService.indices.exists({
      index: this.RENTALS_INDEX,
    });

    if (!indexExists) {
      await this.elasticsearchService.indices.create({
        index: this.RENTALS_INDEX,
      });

      await this.elasticsearchService.indices.putMapping({
        index: this.RENTALS_INDEX, // Add an "id" field
        body: {
          properties: {
            name: { type: 'text' },
            description: { type: 'text' },
            category: { type: 'text' },
            username: { type: 'text' },
          },
        },
      });
    }

    const res = await this.elasticsearchService.index({
      index: this.RENTALS_INDEX,
      id: 'hhh', // Add an "id" field
      // body: {
      //   name: "دوچرخه",
      //   description: "بسیار تمیز و خوب",
      //   category: "تفریحی",
      //   username: "معین",
      // },
      body: {
        name: 'aaa',
        description: 'bbb',
        category: 'ccc',
        username: 'ddd',
      },
    });
    console.log({ res });
  }

  async searchDocumentService(query: string) {
    const res = await this.elasticsearchService.search({
      index: this.RENTALS_INDEX,
      body: {
        size: 50,
        query: {
          bool: {
            should: [
              {
                multi_match: {
                  query: query, // Your search query
                  fields: ['name', 'description', 'category', 'username'], // List of fields to search in
                },
              },
            ],
          },
        },
      },
    });
    console.log({ res: res?.body?.hits?.hits });
    return res?.body?.hits;
  }

  async createSearchDocument(document: {
    id: string;
    body: {
      name: string;
      description: string;
      category: string;
      username: string;
    };
  }) {
    const res = await this.elasticsearchService.index({
      index: this.RENTALS_INDEX,
      ...document,
    });
  }
}
