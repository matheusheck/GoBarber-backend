import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should authenticate an user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

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
    const fakeRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeRepository,
      fakeHashProvider,
    );
    const createUser = new CreateUserService(fakeRepository, fakeHashProvider);

    await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123',
    });

    expect(
      authenticateUser.execute({
        email: 'john@email.com',
        password: 'P@ssword123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not authenticate wrong password', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(
      fakeRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123',
    });

    expect(
      authenticateUser.execute({
        email: 'john@example.com',
        password: 'Password123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
