import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UserMap from '@modules/users/mappers/UserMapper';

import AuthenticationUserService from '@modules/users/services/AuthenticationUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticationUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    const mappedUser = UserMap.toDTO(user);

    return response.json({ mappedUser, token });
  }
}
