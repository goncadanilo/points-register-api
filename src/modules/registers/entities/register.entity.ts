import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../../modules/users/entities/user.entity';

@ObjectType()
@Entity({ name: 'registered_time' })
export class Register {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'time_registered' })
  timeRegistered: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.registerConnection, { primary: true })
  @JoinColumn({ name: 'user_id' })
  userConnection: Promise<User>;
}
