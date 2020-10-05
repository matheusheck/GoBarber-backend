import UserToken from '@modules/users/infra/typeorm/entity/UserToken';

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>;
}
