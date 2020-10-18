import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('showProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(fakeUserRepository);
  });

  it('should show profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123',
    });

    const updatedUser = await showProfileService.execute({
      user_id: user.id,
    });

    expect(updatedUser.name).toBe('John Doe');
    expect(updatedUser.email).toBe('john@example.com');
  });

  it('should not show a non existing user profile', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'unregisteredID',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
