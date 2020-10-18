import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUser';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProviders';

import User from '@modules/users/infra/typeorm/entity/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne(id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email },
    });

    return findUser;
  }

  public async findAllProviders({
    except_user_ids,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users = [];
    if (except_user_ids) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_ids),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async create(UserData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(UserData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
