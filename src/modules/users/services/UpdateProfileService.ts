import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entity/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const usedEmail = await this.usersRepository.findByEmail(email);

    if (usedEmail && usedEmail.id !== user_id) {
      throw new AppError('Already registered email');
    }

    user.name = name;
    user.email = email;

    if (password) {
      if (!old_password) {
        throw new AppError('inform your current password', 401);
      }

      const passwordMatched = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!passwordMatched) {
        throw new AppError('incorrect old password.', 401);
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
