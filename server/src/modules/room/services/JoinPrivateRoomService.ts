import { getRepository } from 'typeorm';
import { redis } from '../../../redis';

import { Room } from '../../../entities/Room';
import { User } from '../../../entities/User';
import { UsersRooms } from '../../../entities/UsersRooms';

import { invitePrivateRoomPrefix } from '../../constants/redisPrefixes';
import { Context } from '../../../types/Context';

interface IRequest {
  token: string;
  ctx: Context;
}

export class JoinPrivateRoomService {
  public async execute({ token, ctx }: IRequest): Promise<Room | Boolean> {
    try {
      const roomsRespository = getRepository(Room);
      const usersRespository = getRepository(User);
      const usersRoomsRespository = getRepository(UsersRooms);

      const room_id = await redis.get(invitePrivateRoomPrefix + token);

      if (!room_id) {
        return false;
      }

      const room = await roomsRespository.findOne({ id: room_id });

      if (!room) {
        return false;
      }

      if (room.type === 'public') {
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

      await redis.del(invitePrivateRoomPrefix + token);

      return true;
    } catch {
      return false;
    }
  }
}
