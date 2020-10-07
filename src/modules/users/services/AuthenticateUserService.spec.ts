import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakeRepository,
      fakeHashProvider,
    );
  });

  it('should authenticate an user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123',
    });

    const response = await authenticateUser.execute({
      email: 'john@example.com',
      password: 'P@ssword123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not authenticate unregister user', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123',
    });

    await expect(
      authenticateUser.execute({
        email: 'john@email.com',
        password: 'P@ssword123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not authenticate wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123',
    });

    await expect(
      authenticateUser.execute({
        email: 'john@example.com',
        password: 'Password123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
