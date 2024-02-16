import { Injectable } from '@nestjs/common';
import * as Typesense from 'typesense';
import { wordsData } from 'words-data';

@Injectable()
export class TypesenseService {
  private client: any;

  constructor() {
    this.client = new Typesense.Client({
      nodes: [
        {
          host: 'localhost',
          port: 8108,
          protocol: 'http',
        },
      ],
      apiKey: process.env.TYPESENSE_API_KEY,
    });
  }

  async createWordsSchema() {
    try {
      const isExist = await this.client.collections('words').retrieve();
      if (isExist) {
        this.client.collections('words').delete();
      }
    } catch {
      const wordSchema = {
        name: 'words',
        fields: [
          { name: 'right_words', type: 'string' },
          { name: 'wrong_words', type: 'string[]', facet: true },
          { name: 'title', type: 'string' },
          { name: 'description', type: 'string' },
          { name: 'helpful_info', type: 'string' },
          { name: 'type', type: 'string' },
          { name: 'hits', type: 'int32' },
          { name: 'scraps', type: 'int32' },
          { name: 'created_at', type: 'string' },
          { name: 'ratings_count', type: 'int32' },
        ],
        default_sorting_field: 'ratings_count',
      };

      await this.client
        .collections()
        .create(wordSchema)
        .then((data) => {
          console.log(data);
        });
    }

    // const wordSchema = {
    //   name: 'words',
    //   fields: [
    //     { name: 'right_words', type: 'string' },
    //     { name: 'wrong_words', type: 'string[]', facet: true },
    //     { name: 'title', type: 'string' },
    //     { name: 'description', type: 'string' },
    //     { name: 'helpful_info', type: 'string' },
    //     { name: 'type', type: 'string' },
    //     { name: 'hits', type: 'int32' },
    //     { name: 'scraps', type: 'int32' },
    //     { name: 'created_at', type: 'string' },
    //     { name: 'ratings_count', type: 'int32' },
    //   ],
    //   default_sorting_field: 'ratings_count',
    // };

    // await this.client
    //   .collections()
    //   .create(wordSchema)
    //   .then((data) => {
    //     console.log(data);
    //   });
  }

  async insertWordsData() {
    // const insertData = await this.client
    //   .collections('words')
    //   .documents()
    //   .import(wordsData, { action: 'create' });
    // console.log(insertData);
    for (const data of wordsData) {
      data.ratings_count = 0;
      await this.client.collections('words').documents().create(data);
    }
    console.log('done');
  }

  async searchWords() {
    const word = '않되';
    let searchParameters = {
      q: word,
      query_by: ['title', 'helpful_info'],
      sort_by: 'ratings_count:desc',
    };

    await this.client
      .collections('words')
      .documents()
      .search(searchParameters)
      .then(async (searchResults) => {
        console.log(searchResults.hits);
        // searchResults.hits.forEach((o) => {
        //   console.log(o);
        // });
      });
  }
}
