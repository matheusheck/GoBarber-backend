import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();

    listProvidersService = new ListProvidersService(fakeUserRepository);
  });

  it('should list providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'P@ssword123',
    });

    const user2 = await fakeUserRepository.create({
      name: 'John Troe',
      email: 'johnT@example.com',
      password: 'P@ssword123',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'John Loge',
      email: 'johnl@example.com',
      password: 'P@ssword123',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
