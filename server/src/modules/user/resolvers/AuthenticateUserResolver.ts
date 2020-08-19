import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';

import { AuthenticateUserService } from '../services/AuthenticateUserService';
import { User } from '../../../entity/User';
import { Context } from '../../../types/Context';

@Resolver()
export class AuthenticateUserResolver {
  @Mutation(() => User)
  async authenticateUser(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context
  ): Promise<User | string> {
    const authenticateUser = new AuthenticateUserService();

    const user = await authenticateUser.execute({
      email,
      password,
      ctx,
    });

    return user;
  }
}
