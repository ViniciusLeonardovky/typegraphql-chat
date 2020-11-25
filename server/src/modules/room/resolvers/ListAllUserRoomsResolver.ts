import { Resolver, UseMiddleware, Query, Ctx } from 'type-graphql';

import { ListAllUserRoomsService } from '../services/ListAllUserRoomsService';
import { Room } from '../../../entities/Room';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';
import { Context } from '../../../types/Context';

@Resolver()
export class ListAllUserRoomsResolver {
  @UseMiddleware(ensureAuthenticated)
  @Query(() => [Room])
  async listAllUserRooms(@Ctx() ctx: Context): Promise<Room[]> {
    const listAllUserRooms = new ListAllUserRoomsService();

    const rooms = await listAllUserRooms.execute({ ctx });

    return rooms;
  }
}
