import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should update only existing users profiles', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'userInvalidId',
        name: 'Josef Doe',
        email: 'josef@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should update profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Josef Doe',
      email: 'josef@example.com',
    });

    expect(updatedUser.name).toBe('Josef Doe');
    expect(updatedUser.email).toBe('josef@example.com');
  });

  it('should not update profile with used email', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123',
    });

    await fakeUserRepository.create({
      name: 'Josef Doe',
      email: 'josef@example.com',
      password: 'P@ssword123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Josef Doe',
        email: 'josef@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Josef Doe',
      email: 'josef@example.com',
      old_password: 'P@ssword123',
      password: 'P@ssword321',
    });

    expect(updatedUser.password).toBe('P@ssword321');
  });

  it('should not be able to update password without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'P@ssword321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'john@example.com',
        old_password: 'P@ssword',
        password: 'P@ssword321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
