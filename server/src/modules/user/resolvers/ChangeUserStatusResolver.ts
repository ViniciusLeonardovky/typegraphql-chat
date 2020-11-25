import { Resolver, Mutation, UseMiddleware, Ctx } from 'type-graphql';

import { ChangeUserStatusService } from '../services/ChangeUserStatusService';
import { User } from '../../../entities/User';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';
import { Context } from '../../../types/Context';

@Resolver()
export class ChangeUserStatusResolver {
  @UseMiddleware(ensureAuthenticated)
  @Mutation(() => User)
  async changeUserStatus(@Ctx() ctx: Context): Promise<User> {
    const changeStatus = new ChangeUserStatusService();

    const user = await changeStatus.execute({ ctx });

    return user;
  }
}
