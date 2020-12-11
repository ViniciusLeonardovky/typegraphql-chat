import { getRepository } from 'typeorm';

import { RoomMessage } from '../../../entities/RoomMessage';
import { User } from '../../../entities/User';
import { UsersRooms } from '../../../entities/UsersRooms';

import { Context } from '../../../types/Context';

interface IRequest {
  room_id: string;
  content: string;
  ctx: Context;
}

interface IResponse {
  message: RoomMessage;
  user: User;
}

export class SendMessageRoomService {
  public async execute({
    room_id,
    content,
    ctx,
  }: IRequest): Promise<IResponse> {
    const roomMessagesRespository = getRepository(RoomMessage);
    const usersRespository = getRepository(User);
    const usersRoomsRespository = getRepository(UsersRooms);

    if (!content) {
      throw new Error('Content must be contain a value');
    }

    const userExistsInRoom = await usersRoomsRespository.findOne({
      where: { room_id, user_id: ctx.req.session!.userId },
    });

    if (!userExistsInRoom) {
      throw new Error("User can't send message on this room");
    }

    const user = await usersRespository.findOne({
      where: { id: ctx.req.session!.userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const message = roomMessagesRespository.create({
      room_id,
      user_id: user.id,
      content,
    });

    await roomMessagesRespository.save(message);

    return {
      message,
      user,
    };
  }
}
