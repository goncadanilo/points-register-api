import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hashPasswordTransform } from '../../../common/transformers/crypto-transformer';
import { Register } from '../../../modules/registers/entities/register.entity';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ transformer: hashPasswordTransform })
  @HideField()
  password: string;

  @Column()
  role: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Register, (register) => register.userConnection)
  registerConnection: Promise<Register[]>;
}
