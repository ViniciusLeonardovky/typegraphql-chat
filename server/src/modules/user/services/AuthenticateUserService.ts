import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import { User } from '../../../entities/User';
import { Context } from '../../../types/Context';

interface IRequest {
  email: string;
  password: string;
  ctx: Context;
}

export class AuthenticateUserService {
  public async execute({
    email,
    password,
    ctx,
  }: IRequest): Promise<User | string> {
    const usersRespository = getRepository(User);

    const user = await usersRespository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('invalid email/password');
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new Error('invalid email/password');
    }

    ctx.req.session!.userId = user.id;

    return user;
  }
}
