import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { RightWord } from './RightWord.entity';

@Entity('wordPost', { schema: 'hanall_project' })
export class WordPost {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'Primary Key' })
  id: number;

  @Column('varchar', { comment: '게시글 제목', length: 255 })
  title: string;

  @Column('varchar', {
    name: 'description',
    comment: '맞춤법에 대한 설명',
    length: 1000,
  })
  description: string;

  @Column('varchar', { comment: '쉽게 외우는 방법', length: 1000 })
  helpfulInfo: string;

  @Column({ type: 'int', comment: '조회수', default: 0 })
  hitCount: number;

  @Column({ type: 'int', comment: '보관 횟수', default: 0 })
  scrapCount: number;

  @Column({ type: 'int', comment: '연관 게시글', nullable: true })
  relatedPostId: number;

  @ManyToOne(() => RightWord)
  @JoinColumn()
  rightWord: RightWord;

  @CreateDateColumn({ name: 'createTime', type: 'timestamp' })
  createTime: Date | null;

  @UpdateDateColumn({ name: 'updateTime', type: 'timestamp' })
  updateTime: Date | null;

  @DeleteDateColumn({ name: 'deleteTime', type: 'timestamp', nullable: true })
  deleteTime: Date | null;
}
