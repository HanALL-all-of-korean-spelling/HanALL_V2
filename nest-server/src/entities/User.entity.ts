import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('user', { schema: 'hanall_project' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'Primary Key' })
  id: number;

  @Column('varchar', { comment: '이메일', length: 50 })
  email: string;

  @Column('varchar', { comment: '비밀번호', length: 100 })
  passwd: string;

  @Column('varchar', { comment: '닉네임', length: 20 })
  nickname: string;

  @Column('varchar', { comment: '등급', length: 50 })
  userRank: string;

  @Column({ type: 'int', comment: '획득 점수' })
  userPoint: number;

  @Column({ type: 'int', comment: '어드민 계정 여부' })
  isAdmin: number;

  @CreateDateColumn({ name: 'createTime', type: 'timestamp' })
  createTime: Date | null;

  @UpdateDateColumn({ name: 'updateTime', type: 'timestamp' })
  updateTime: Date | null;

  @DeleteDateColumn({ name: 'deleteTime', type: 'timestamp', nullable: true })
  deleteTime: Date | null;
}
