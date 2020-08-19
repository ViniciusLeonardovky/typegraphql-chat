import { User } from '../../../entity/User';
import { Context } from '../../../types/Context';

interface IRequest {
  ctx: Context;
}

export class ShowUserService {
  public async execute({ ctx }: IRequest): Promise<User | string | undefined> {
    if (!ctx.req.session!.userId) {
      return 'user not found';
    }

    return User.findOne(ctx.req.session!.userId);
  }
}
