import { Injectable } from '@nestjs/common';
import { PostsRepsitory } from './modules/posts/posts.repository';

@Injectable()
export class AppService {
  constructor(private postsRepository: PostsRepsitory) {}
}
