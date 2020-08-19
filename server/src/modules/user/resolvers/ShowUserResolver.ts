import { Resolver, Query, Ctx, UseMiddleware } from 'type-graphql';

import { User } from '../../../entity/User';
import { Context } from '../../../types/Context';
import { ShowUserService } from '../services/ShowUserService';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';

@Resolver()
export class ShowUserResolver {
  @UseMiddleware(ensureAuthenticated)
  @Query(() => User, { nullable: true })
  async showUser(@Ctx() ctx: Context): Promise<User | string | undefined> {
    const showUser = new ShowUserService();

    const user = await showUser.execute({ ctx });

    return user;
  }
}
