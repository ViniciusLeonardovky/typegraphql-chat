import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from 'type-graphql';

import { JoinPrivateRoomService } from '../services/JoinPrivateRoomService';
import { Room } from '../../../entities/Room';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';
import { Context } from '../../../types/Context';

@Resolver()
export class JoinPrivateRoomResolver {
  @UseMiddleware(ensureAuthenticated)
  @Mutation(() => Boolean)
  async joinPrivateRoom(
    @Arg('token') token: string,
    @Ctx() ctx: Context
  ): Promise<Room | Boolean> {
    const joinPrivateRoom = new JoinPrivateRoomService();

    const room = await joinPrivateRoom.execute({ token, ctx });

    return room;
  }
}
