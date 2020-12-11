import {
  Resolver,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
  ObjectType,
  Field,
} from 'type-graphql';

import { SendMessageRoomService } from '../services/SendMessageRoomService';
import { RoomMessage } from '../../../entities/RoomMessage';
import { User } from '../../../entities/User';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';
import { Context } from '../../../types/Context';

@ObjectType()
class Response {
  @Field(() => RoomMessage)
  message: RoomMessage;

  @Field(() => User)
  user: User;
}

@Resolver()
export class SendMessageRoom {
  @UseMiddleware(ensureAuthenticated)
  @Mutation(() => Response)
  async sendMessageRoom(
    @Arg('room_id') room_id: string,
    @Arg('content') content: string,
    @Ctx() ctx: Context
  ): Promise<Response> {
    const sendMessageRoom = new SendMessageRoomService();

    const message = await sendMessageRoom.execute({ room_id, content, ctx });

    return message;
  }
}
