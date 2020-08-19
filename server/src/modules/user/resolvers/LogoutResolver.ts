import { Resolver, Mutation, UseMiddleware, Ctx } from 'type-graphql';

import { LogoutService } from '../services/LogoutService';
import { Context } from '../../../types/Context';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';

@Resolver()
export class LogoutResolver {
  @UseMiddleware(ensureAuthenticated)
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<Boolean> {
    const logout = new LogoutService();

    const logouted = await logout.execute({ ctx });

    return logouted;
  }
}
