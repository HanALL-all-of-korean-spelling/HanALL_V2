import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('rightWord', { schema: 'hanall_project' })
export class RightWord {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'Primary Key' })
  id: number;

  @Column('varchar', { comment: '올바른 단어', length: 1000 })
  name: string;

  @CreateDateColumn({ name: 'createTime', type: 'timestamp' })
  createTime: Date | null;

  @UpdateDateColumn({ name: 'updateTime', type: 'timestamp' })
  updateTime: Date | null;

  @DeleteDateColumn({ name: 'deleteTime', type: 'timestamp', nullable: true })
  deleteTime: Date | null;
}
