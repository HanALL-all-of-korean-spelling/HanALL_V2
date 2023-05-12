import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { wordsData } from 'words-data';
import { workerData } from 'worker_threads';
import { WordType } from './entities/enums/wordType.enum';
import { CreatePostDbDto } from './modules/posts/dto/posts.db.dto';
import { PostsRepsitory } from './modules/posts/posts.repository';
import { RightWordRepository } from './modules/words/repositories/rightWord.repository';
import { WrongWordRepository } from './modules/words/repositories/wrongWord.repository';

@Injectable()
export class AppService {
  constructor(private esService: ElasticsearchService) {}
  async createIndex() {
    const index = 'word_post';
    const checkIndex: boolean = await this.esService.indices.exists({
      index,
    });
    if (!checkIndex) {
      try {
        await this.esService.indices.create({
          index: index,
          settings: {
            analysis: {
              analyzer: {
                nori: {
                  type: 'custom',
                  tokenizer: 'nori_mixed',
                },
              },
              tokenizer: {
                nori_mixed: {
                  type: 'nori_tokenizer',
                  decompound_mode: 'mixed',
                  user_dictionary_rules: ['왠', '웬'],
                },
              },
            },
          },
          mappings: {
            properties: {
              right_words: {
                type: 'text',
                analyzer: 'nori',
              },
              wrong_words: {
                type: 'text',
                analyzer: 'nori',
              },
              title: { type: 'text' },
              description: {
                type: 'text',
              },
            },
          },
        });
        console.log(`Created ${index} index`);
      } catch (err) {
        console.log(`${index} index error`, err);
      }
    } else {
      console.log(`${index} index is already exist`);
    }
  }
}
