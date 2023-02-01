import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from './Post.entity';
import { User } from './User.entity';

@Entity('scrap', { schema: 'hanall_project' })
export class Scrap {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'Primary Key' })
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Post)
  @JoinColumn()
  post: Post;

  @CreateDateColumn({ name: 'createTime', type: 'timestamp' })
  createTime: Date | null;

  @UpdateDateColumn({ name: 'updateTime', type: 'timestamp' })
  updateTime: Date | null;

  @DeleteDateColumn({ name: 'deleteTime', type: 'timestamp', nullable: true })
  deleteTime: Date | null;
}
