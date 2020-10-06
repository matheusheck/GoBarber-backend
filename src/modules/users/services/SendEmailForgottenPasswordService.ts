import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// import User from '@modules/users/infra/typeorm/entity/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  email: string;
}

@injectable()
class SendEmailForgottenPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User should exist');
    }

    await this.userTokensRepository.generate(user.id);

    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha');
  }
}

export default SendEmailForgottenPasswordService;
