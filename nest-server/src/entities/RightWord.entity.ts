import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { WordType } from './enums/wordType.enum';

@Entity('rightWord', { schema: 'hanall_project' })
export class RightWord {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'Primary Key' })
  id: number;

  @Column('varchar', { comment: '올바른 단어', length: 1000 })
  name: string;

  @Column('varchar', { comment: '맞춤법 종류(철자/띄어쓰기)', length: 1000 })
  type: WordType;

  @CreateDateColumn({ name: 'createTime', type: 'timestamp' })
  createTime: Date | null;

  @UpdateDateColumn({ name: 'updateTime', type: 'timestamp' })
  updateTime: Date | null;

  @DeleteDateColumn({ name: 'deleteTime', type: 'timestamp', nullable: true })
  deleteTime: Date | null;
}
