import { getRepository } from 'typeorm';

import { Room } from '../../../entity/Room';

export class ListAllPublicRoomsService {
  public async execute(): Promise<Room[]> {
    const roomsRespository = getRepository(Room);

    const rooms = await roomsRespository.find({ where: { type: 'public' } });

    return rooms;
  }
}
