import { RoomMessage } from '../../../../entities/RoomMessage';
import { User } from '../../../../entities/User';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class MessageResponse {
  @Field(() => RoomMessage)
  message: RoomMessage;

  @Field(() => User)
  user: User;
}

@ObjectType()
export class MessagesResponse {
  @Field(() => String)
  id: string;

  @Field(() => String)
  content: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => String)
  room_id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  nickname: string;
}
