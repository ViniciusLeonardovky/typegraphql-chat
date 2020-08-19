import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from 'type-graphql';

import { CreateRoomService } from '../services/CreateRoomService';
import { Room } from '../../../entity/Room';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';
import { Context } from '../../../types/Context';

@Resolver()
export class CreateRoomResolver {
  @UseMiddleware(ensureAuthenticated)
  @Mutation(() => Room)
  async createRoom(
    @Arg('name') name: string,
    @Arg('description') description: string,
    @Arg('type') type: 'private' | 'public',
    @Ctx() ctx: Context
  ): Promise<Room> {
    const createRoom = new CreateRoomService();

    const room = await createRoom.execute({ name, description, type, ctx });

    return room;
  }
}
