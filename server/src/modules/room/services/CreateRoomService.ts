import { getRepository } from 'typeorm';

import { Room } from '../../../entity/Room';
import { User } from '../../../entity/User';
import { Context } from '../../../types/Context';

interface IRequest {
  name: string;
  description: string;
  type: 'public' | 'private';
  ctx: Context;
}

export class CreateRoomService {
  public async execute({
    name,
    description,
    type,
    ctx,
  }: IRequest): Promise<Room> {
    const roomsRespository = getRepository(Room);
    const usersRespository = getRepository(User);

    const users = await usersRespository.find({
      where: { id: ctx.req.session!.userId },
    });

    const room = roomsRespository.create({
      owner_id: ctx.req.session!.userId,
      name,
      description,
      type,
      users: users,
    });

    await room.save();

    return room;
  }
}
