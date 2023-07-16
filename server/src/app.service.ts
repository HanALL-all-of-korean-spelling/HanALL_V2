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
  constructor(
    private esService: ElasticsearchService,
    private postsRepository: PostsRepsitory,
  ) {}
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
                  filter: ['lowercase', 'stop'],
                },
              },
              tokenizer: {
                nori_mixed: {
                  type: 'nori_tokenizer',
                  decompound_mode: 'mixed',
                  discard_punctuation: true,
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
              title: {
                type: 'text',
                analyzer: 'nori',
                search_analyzer: 'standard',
              },
              description: {
                type: 'text',
                analyzer: 'nori',
                search_analyzer: 'standard',
              },
              heplful_info: {
                type: 'text',
                analyzer: 'nori',
                search_analyzer: 'standard',
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

  async insertData() {
    const index = 'word_post';
    const checkIndex: boolean = await this.esService.indices.exists({
      index,
    });
    if (!checkIndex) return;
    const postData = await this.postsRepository.findAll();
    for (const post of postData) {
      await this.esService.index({
        index: index,
        document: {
          title: post.title,
          description: post.description,
          right_words: post.rightWord.name,
          wrong_words: post.rightWord.wrongWord.name,
        },
      });
    }
    console.log(`Inserted ${index} data`);
  }
}
