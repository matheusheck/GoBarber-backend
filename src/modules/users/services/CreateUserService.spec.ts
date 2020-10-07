import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeRepository, fakeHashProvider);
  });

  it('should create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not create a new user with a registered email', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'P@ssword123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
