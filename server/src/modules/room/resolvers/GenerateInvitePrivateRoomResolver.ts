import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from 'type-graphql';

import { GenerateInvitePrivateRoomService } from '../services/GenerateInvitePrivateRoomService';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';
import { Context } from '../../../types/Context';

@Resolver()
export class GenerateInvitePrivateRoomResolver {
  @UseMiddleware(ensureAuthenticated)
  @Mutation(() => String)
  async generateInvitePrivateRoom(
    @Arg('room_id') room_id: string,
    @Ctx() ctx: Context
  ): Promise<String> {
    const generateInvitePrivateRoom = new GenerateInvitePrivateRoomService();

    const token = await generateInvitePrivateRoom.execute({ room_id, ctx });

    return token;
  }
}
