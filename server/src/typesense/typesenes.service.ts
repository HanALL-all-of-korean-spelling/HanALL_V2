import { Injectable } from '@nestjs/common';
import * as Typesense from 'typesense';
import { wordsData } from 'words-data';

@Injectable()
export class TypesenseService {
  private client;
  constructor() {
    this.client = new Typesense.Client({
      nodes: [
        {
          host: '127.0.0.1',
          port: 8108,
          protocol: 'http',
        },
      ],
      apiKey: process.env.TYPESENSE_API_KEY,
      connectionTimeoutSeconds: 2,
    });
  }

  async getConnection() {
    console.log(await this.client);
  }

  async createWordsSchema() {
    try {
      const isExist = await this.client.collections('words').retrieve();
      if (isExist) {
        console.log('isExist', isExist);
        this.client.collections('words').delete();
      }
    } catch {
      const wordSchema = {
        name: 'words',
        num_documents: 0,
        fields: [
          { name: 'id', type: 'int32' },
          { name: 'title', type: 'string' },
          { name: 'right_words', type: 'string' },
          { name: 'wrong_words', type: 'string[]', facet: true },
          { name: 'description', type: 'string' },
          { name: 'helpful_info', type: 'string' },
          { name: 'type', type: 'string' },
          { name: 'rank', type: 'int32' },
        ],
        default_sorting_field: 'rank',
      };

      await this.client
        .collections()
        .create(wordSchema)
        .then((data) => {
          console.log(data);
        });
    }
  }

  async insertWordsData() {
    for (const data of wordsData) {
      data.ratings_count = 0;
      await this.client.collections('words').documents().create(data);
    }
    console.log('done');
  }

  async searchWords() {
    const word = '왠 웬';
    let searchParameters = {
      q: word,
      query_by: 'title',
      sort_by: 'ratings_count:desc',
    };

    await this.client
      .collections('words')
      .documents()
      .search(searchParameters)
      .then(async (searchResults) => {
        console.log(searchResults.hits);
      });
  }
}
