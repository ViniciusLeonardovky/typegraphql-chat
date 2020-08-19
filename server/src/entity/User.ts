import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Room } from './Room';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  nickname: string;

  @Field()
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Field()
  @Column({ type: 'varchar' })
  status: 'online' | 'offline';

  @ManyToMany(() => Room)
  @JoinTable({
    name: 'users_rooms',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'room_id' }],
  })
  rooms: Room[];

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
