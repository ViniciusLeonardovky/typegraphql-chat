import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from 'type-graphql';

import { JoinPublicRoomService } from '../services/JoinPublicRoomService';
import { Room } from '../../../entities/Room';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';
import { Context } from '../../../types/Context';

@Resolver()
export class JoinPublicRoomResolver {
  @UseMiddleware(ensureAuthenticated)
  @Mutation(() => Room)
  async joinPublicRoom(
    @Arg('room_id') room_id: string,
    @Ctx() ctx: Context
  ): Promise<Room | Boolean> {
    const joinPublicRoom = new JoinPublicRoomService();

    const room = await joinPublicRoom.execute({ room_id, ctx });

    return room;
  }
}
