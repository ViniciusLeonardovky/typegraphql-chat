import { getRepository } from 'typeorm';

import { Room } from '../../../entities/Room';
import { User } from '../../../entities/User';

interface IRequest {
  room_id: string;
}

export class ListAllRoomUsersService {
  public async execute({ room_id }: IRequest): Promise<User[]> {
    const roomsRespository = getRepository(Room);

    const room = await roomsRespository.findOne(room_id);

    if (!room) {
      throw new Error('Room not found');
    }

    const users = room.users;

    return users;
  }
}
