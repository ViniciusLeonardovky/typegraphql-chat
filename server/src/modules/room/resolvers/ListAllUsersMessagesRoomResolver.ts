import { Resolver, UseMiddleware, Query, Arg } from 'type-graphql';

import { ListAllUsersMessagesRoomService } from '../services/ListAllUsersMessagesRoomService';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';
import { MessagesResponse } from './types/MessageResponse';

@Resolver()
export class ListAllUsersMessagesRoomResolver {
  @UseMiddleware(ensureAuthenticated)
  @Query(() => [MessagesResponse])
  async listAllUsersMessagesRoom(
    @Arg('room_id') room_id: string
  ): Promise<MessagesResponse[]> {
    const listAllUsersMessagesRoom = new ListAllUsersMessagesRoomService();

    const messages = await listAllUsersMessagesRoom.execute({ room_id });

    return messages;
  }
}
