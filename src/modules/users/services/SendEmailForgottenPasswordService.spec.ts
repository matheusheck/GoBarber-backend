import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendEmailForgottenPasswordService from './SendEmailForgottenPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let emailForgottenPassword: SendEmailForgottenPasswordService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();

    emailForgottenPassword = new SendEmailForgottenPasswordService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover password using email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
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
    await expect(
      emailForgottenPassword.execute({
        email: 'john@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a user token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

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
