import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

// import User from '@modules/users/infra/typeorm/entity/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
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
  ) {}

  public async execute({ email }): Promise<void> {
    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha');
  }
}

export default SendEmailForgottenPasswordService;
