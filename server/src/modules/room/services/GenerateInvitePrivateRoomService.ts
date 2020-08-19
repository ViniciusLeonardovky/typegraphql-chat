import { getRepository } from 'typeorm';
import { v4 } from 'uuid';
import { redis } from '../../../redis';

import { invitePrivateRoomPrefix } from '../../constants/redisPrefixes';

import { Room } from '../../../entity/Room';

import { Context } from '../../../types/Context';

interface IRequest {
  room_id: string;
  ctx: Context;
}

export class GenerateInvitePrivateRoomService {
  public async execute({ room_id, ctx }: IRequest): Promise<string> {
    const roomsRespository = getRepository(Room);

    const room = await roomsRespository.findOne({
      id: room_id,
      owner_id: ctx.req.session!.userId,
    });

    if (!room) {
      throw new Error('only room owner can generate an invite token');
    }

    const token = v4();

    await redis.set(
      invitePrivateRoomPrefix + token,
      room_id,
      'ex',
      60 * 60 * 24
    );

    return token;
  }
}
