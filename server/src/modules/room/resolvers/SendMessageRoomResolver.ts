import {
  Resolver,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
  PubSub,
  Publisher,
} from 'type-graphql';

import { SendMessageRoomService } from '../services/SendMessageRoomService';

import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';
import { Context } from '../../../types/Context';

import { MessageResponse } from './types/MessageResponse';

// @Resolver()
// export class SendMessageRoomResolver {
//   @UseMiddleware(ensureAuthenticated)
//   @Mutation(() => MessageResponse)
//   async sendMessageRoom(
//     @Arg('room_id') room_id: string,
//     @Arg('content') content: string,
//     @Ctx() ctx: Context
//   ): Promise<MessageResponse> {
//     const sendMessageRoom = new SendMessageRoomService();

//     const message = await sendMessageRoom.execute({ room_id, content, ctx });

//     return message;
//   }
// }

@Resolver()
export class SendMessageRoomResolver {
  @UseMiddleware(ensureAuthenticated)
  @Mutation(() => Boolean)
  async sendMessageRoom(
    @Arg('room_id') room_id: string,
    @Arg('content') content: string,
    @PubSub('MESSAGE') publish: Publisher<MessageResponse>,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    const sendMessageRoom = new SendMessageRoomService();

    const newMessage = await sendMessageRoom.execute({ room_id, content, ctx });

    await publish(newMessage);
    return true;
  }
}
