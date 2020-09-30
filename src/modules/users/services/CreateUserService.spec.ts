import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from './CreateUserService';


describe('CreateUser',()=> {
  it('should create a new user', async ()=> {
    const fakeRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeRepository);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123'
    });

    expect(user).toHaveProperty('id');
  });

  it('should not create a new user with a registered email', async ()=> {
    const fakeRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeRepository);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123'
    });

    expect(createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123'
    })).rejects.toBeInstanceOf(AppError)
  });
});
