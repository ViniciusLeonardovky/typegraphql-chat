import { Resolver, UseMiddleware, Query, Arg } from 'type-graphql';

import { ListAllRoomUsersService } from '../services/ListAllRoomUsersService';
import { User } from '../../../entities/User';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';

@Resolver()
export class ListAllRoomUsersResolver {
  @UseMiddleware(ensureAuthenticated)
  @Query(() => [User])
  async listAllRoomUsers(@Arg('room_id') room_id: string): Promise<User[]> {
    const listAllRoomUsers = new ListAllRoomUsersService();

    const users = await listAllRoomUsers.execute({ room_id });

    return users;
  }
}
