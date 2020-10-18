import { uuid } from 'uuidv4';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUser';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProviders';

import User from '@modules/users/infra/typeorm/entity/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findAllProviders({
    except_user_ids,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    if (except_user_ids) {
      users = users.filter(user => user.id !== except_user_ids);
    }

    return users;
  }

  public async create(UserData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, UserData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
