import { Resolver, Mutation, Arg, Query, UseMiddleware } from 'type-graphql';

import { RegisterUserService } from '../services/RegisterUserService';
import { User } from '../../../entities/User';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';

@Resolver()
export class RegisterUserResolver {
  @UseMiddleware(ensureAuthenticated)
  @Query(() => String)
  async hello() {
    return 'hello World';
  }

  @Mutation(() => User)
  async registerUser(
    @Arg('name') name: string,
    @Arg('nickname') nickname: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User | string> {
    const registerUser = new RegisterUserService();

    const user = await registerUser.execute({
      name,
      nickname,
      email,
      password,
    });

    return user;
  }
}
