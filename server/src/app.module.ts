import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { AnswersModule } from './modules/answers/answers.module';
import { ScrapsModule } from './modules/scraps/scraps.module';
import { RightWordRepository } from './modules/words/repositories/rightWord.repository';
import { WrongWordRepository } from './modules/words/repositories/wrongWord.repository';
import { PostsRepsitory } from './modules/posts/posts.repository';
import { RightWord } from './entities/RightWord.entity';
import { WrongWord } from './entities/WrongWord.entity';
import { WordPost } from './entities/WordPost.entity';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3307,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    ElasticsearchModule.registerAsync({
      useFactory: async () => ({
        node: 'http://elasticsearch:9200',
        maxRetries: 10,
        requestTimeout: 60000,
      }),
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    QuestionsModule,
    AnswersModule,
    ScrapsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private appService: AppService) {}
  async onModuleInit() {
    //await this.appService.createIndex();
    //await this.appService.insertData();
  }
}
