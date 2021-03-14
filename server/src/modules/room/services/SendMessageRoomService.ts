import { getRepository } from 'typeorm';

import { RoomMessage } from '../../../entities/RoomMessage';
import { User } from '../../../entities/User';
import { UsersRooms } from '../../../entities/UsersRooms';

import { Context } from '../../../types/Context';
import { MessageResponse } from '../resolvers/types/MessageResponse';

interface IRequest {
  room_id: string;
  content: string;
  ctx: Context;
}

export class SendMessageRoomService {
  public async execute({
    room_id,
    content,
    ctx,
  }: IRequest): Promise<MessageResponse> {
    const roomMessagesRespository = getRepository(RoomMessage);
    const usersRespository = getRepository(User);
    const usersRoomsRespository = getRepository(UsersRooms);

    content = content.trim();

    if (!content.trim()) {
      throw new Error('Content must be contain a value');
    }

    const user_id = ctx.req.session!.userId;
    console.log('->', user_id);

    const userExistsInRoom = await usersRoomsRespository.findOne({
      where: { room_id, user_id },
    });

    if (!userExistsInRoom) {
      throw new Error("User can't send message on this room");
    }

    const user = await usersRespository.findOne({
      where: { id: user_id },
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
