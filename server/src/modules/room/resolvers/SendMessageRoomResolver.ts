import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from 'type-graphql';

import { SendMessageRoomService } from '../services/SendMessageRoomService';

import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';
import { Context } from '../../../types/Context';

import { MessageResponse } from './types/MessageResponse';

@Resolver()
export class SendMessageRoomResolver {
  @UseMiddleware(ensureAuthenticated)
  @Mutation(() => MessageResponse)
  async sendMessageRoom(
    @Arg('room_id') room_id: string,
    @Arg('content') content: string,
    @Ctx() ctx: Context
  ): Promise<MessageResponse> {
    const sendMessageRoom = new SendMessageRoomService();

    const message = await sendMessageRoom.execute({ room_id, content, ctx });

    return message;
  }
}
