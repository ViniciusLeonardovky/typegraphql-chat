import { getRepository } from 'typeorm';
import { User } from '../../../entities/User';
import { Context } from '../../../types/Context';

interface IRequest {
  ctx: Context;
}

export class LogoutService {
  public async execute({ ctx }: IRequest): Promise<Boolean> {
    const usersRespository = getRepository(User);

    await usersRespository.update(
      { id: ctx.req.session!.userId },
      { status: 'offline' }
    );

    return new Promise((res, rej) =>
      ctx.req.session!.destroy((err) => {
        if (err) {
          return rej(false);
        }

        ctx.res.clearCookie('qid');

        return res(true);
      })
    );
  }
}
