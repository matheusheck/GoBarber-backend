import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
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

  it('should not be able to recover password using unregister email', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const emailForgottenPassword = new SendEmailForgottenPasswordService(
      fakeUserRepository,
      fakeMailProvider,
    );

    await expect(
      emailForgottenPassword.execute({
        email: 'john@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a user token', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeUserTokensRepository = new FakeUserTokensRepository();
    const fakeMailProvider = new FakeMailProvider();

    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const emailForgottenPassword = new SendEmailForgottenPasswordService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123',
    });

    await emailForgottenPassword.execute({
      email: 'john@example.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
