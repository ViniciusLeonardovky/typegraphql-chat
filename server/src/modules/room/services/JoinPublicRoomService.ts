import { getRepository } from 'typeorm';

import { Room } from '../../../entity/Room';
import { User } from '../../../entity/User';
import { UsersRooms } from '../../../entity/UsersRooms';

import { Context } from '../../../types/Context';

interface IRequest {
  room_id: string;
  ctx: Context;
}

export class JoinPublicRoomService {
  public async execute({ room_id, ctx }: IRequest): Promise<Room | Boolean> {
    try {
      const roomsRespository = getRepository(Room);
      const usersRespository = getRepository(User);
      const usersRoomsRespository = getRepository(UsersRooms);

      const room = await roomsRespository.findOne({ id: room_id });

      if (!room) {
        return false;
      }

      if (room.type === 'private') {
        return false;
      }

      const user = await usersRespository.findOne({
        where: { id: ctx.req.session!.userId },
      });

      if (!user) {
        return false;
      }

      const users_id_room = await usersRoomsRespository.find({
        where: { room_id },
        select: ['user_id'],
      });

      const users = await usersRespository.findByIds(
        users_id_room.map((user_room) => {
          return user_room.user_id;
        })
      );

      users.push(user);

      room.users = users;

      room.save();

      return room;
    } catch {
      return false;
    }
  }
}
