import { Field, HideField, ID } from '@nestjs/graphql';
import { hashPasswordTransform } from 'common/transformers/crypto-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ transformer: hashPasswordTransform })
  @HideField()
  password: string;

  @Column({ name: 'role_id' })
  roleId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
