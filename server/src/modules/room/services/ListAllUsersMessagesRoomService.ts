import { getRepository } from 'typeorm';

import { Room } from '../../../entities/Room';
import { MessagesResponse } from '../resolvers/types/MessageResponse';

interface IRequest {
  room_id: string;
}

export class ListAllUsersMessagesRoomService {
  public async execute({ room_id }: IRequest): Promise<MessagesResponse[]> {
    const roomsRespository = getRepository(Room);

    const room = await roomsRespository.findOne(room_id);

    if (!room) {
      throw new Error('Room not found');
    }

    const messages = (await roomsRespository.query(
      `
      select
        rm.id,
        rm."content",
        rm.created_at,
        rm.updated_at,
        u."name" "username",
        u.nickname
      from
        room_messages rm,
        users u,
        rooms r
      where rm.user_id = u.id and rm.room_id = r.id
      and r.id = $1
      order by rm.created_at asc`,
      [room_id]
    )) as MessagesResponse[];

    return messages;
  }
}
