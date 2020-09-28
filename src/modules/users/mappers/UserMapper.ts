import User from '@modules/users/infra/typeorm/entity/User';

export default class UserMap {
  public static toDomain(): User {}

  public static toPersistence(): User {}

  public static toDTO(user: User): any {
    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
    };
  }
}
