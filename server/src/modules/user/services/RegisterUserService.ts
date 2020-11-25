import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import { User } from '../../../entities/User';

interface IRequest {
  name: string;
  nickname: string;
  email: string;
  password: string;
}

export class RegisterUserService {
  public async execute({
    name,
    nickname,
    email,
    password,
  }: IRequest): Promise<User | string> {
    const usersRespository = getRepository(User);

    const checkUserExists = await usersRespository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('email already used');
    }

    const hashedPassword = await hash(password, 12);

    const user = usersRespository.create({
      name,
      nickname,
      email,
      password: hashedPassword,
      status: 'offline',
    });

    await user.save();

    return user;
  }
}
