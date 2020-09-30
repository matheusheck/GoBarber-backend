import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';


describe('CreateUser',()=> {
  it('should authenticate an user', async ()=> {
    const fakeRepository = new FakeUsersRepository();
    const authenticateUser = new AuthenticateUserService(fakeRepository);
    const createUser = new CreateUserService(fakeRepository);

    await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123'
    });

    const response = await authenticateUser.execute({
      email: 'john@example.com',
      password: 'P@ssword123'
    });

    expect(response).toHaveProperty('token');
  });

  it('should not authenticate wrong user', async ()=> {
    const fakeRepository = new FakeUsersRepository();
    const authenticateUser = new AuthenticateUserService(fakeRepository);
    const createUser = new CreateUserService(fakeRepository);

    await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123'
    });


    expect(authenticateUser.execute({
      email: 'john@email.com',
      password: 'P@ssword123'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not authenticate wrong password', async ()=> {
    const fakeRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeRepository);
    const authenticateUser = new AuthenticateUserService(fakeRepository);

    await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123'
    });


    expect(authenticateUser.execute({
      email: 'john@example.com',
      password: 'Password123'
    })).rejects.toBeInstanceOf(AppError)
  });

});
