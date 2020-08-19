import { Resolver, UseMiddleware, Query } from 'type-graphql';

import { ListAllPublicRoomsService } from '../services/ListAllPublicRoomsService';
import { Room } from '../../../entity/Room';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';

@Resolver()
export class ListAllPublicRoomsResolver {
  @UseMiddleware(ensureAuthenticated)
  @Query(() => [Room])
  async listAllPublicRooms(): Promise<Room[]> {
    const listAllPublicRooms = new ListAllPublicRoomsService();

    const rooms = await listAllPublicRooms.execute();

    return rooms;
  }
}
