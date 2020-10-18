import User from '@modules/users/infra/typeorm/entity/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUser';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProviders';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
