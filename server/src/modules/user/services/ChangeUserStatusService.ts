import { getRepository } from 'typeorm';

import { User } from '../../../entity/User';
import { Context } from '../../../types/Context';

interface IRequest {
  ctx: Context;
}

export class ChangeUserStatusService {
  public async execute({ ctx }: IRequest): Promise<User> {
    const usersRespository = getRepository(User);

    const user = await usersRespository.findOne(ctx.req.session!.userId);

    if (user!.status === 'offline') {
      user!.status = 'online';
      return user!.save();
    } else {
      user!.status = 'offline';
      return user!.save();
    }
  }
}
