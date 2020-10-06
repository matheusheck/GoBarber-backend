import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendEmailForgottenPasswordService from '@modules/users/services/SendEmailForgottenPasswordService';

export default class ForgottenPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const SendEmailForgottenPassword = container.resolve(
      SendEmailForgottenPasswordService,
    );

    await SendEmailForgottenPassword.execute({
      email,
    });

    return response.status(204).json();
  }
}
