import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Question } from './Question.entity';

@Entity('answer', { schema: 'hanall_project' })
export class Answer {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'Primary Key' })
  id: number;

  @Column('varchar', { comment: '답변 내용', length: 1000 })
  content: string;

  @OneToOne(() => Question)
  @JoinColumn()
  question: Question;

  @CreateDateColumn({ name: 'createTime', type: 'timestamp' })
  createTime: Date | null;

  @UpdateDateColumn({ name: 'updateTime', type: 'timestamp' })
  updateTime: Date | null;

  @DeleteDateColumn({ name: 'deleteTime', type: 'timestamp', nullable: true })
  deleteTime: Date | null;
}
