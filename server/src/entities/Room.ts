import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinTable,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { User } from './User';

@ObjectType()
@Entity({ name: 'rooms' })
export class Room extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  owner_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Field()
  @Column({ type: 'varchar' })
  type: 'public' | 'private';

  @ManyToMany(() => User, { eager: true })
  @JoinTable({
    name: 'users_rooms',
    joinColumns: [{ name: 'room_id' }],
    inverseJoinColumns: [{ name: 'user_id' }],
  })
  users: User[];

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
