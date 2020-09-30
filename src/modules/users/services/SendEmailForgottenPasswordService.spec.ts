// import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendEmailForgottenPasswordService from './SendEmailForgottenPasswordService';

describe('CreateUser', () => {
  it('should be able to recover password using email', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const emailForgottenPassword = new SendEmailForgottenPasswordService(
      fakeUserRepository,
      fakeMailProvider,
    );

    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123',
    });

    await emailForgottenPassword.execute({
      email: 'john@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
