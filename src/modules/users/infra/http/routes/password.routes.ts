import { Router } from 'express';

import ForgottenPasswordController from '@modules/users/infra/http/controllers/ForgottenPasswordController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

const passwordRouter = Router();
const forgottenPasswordController = new ForgottenPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgottenPasswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
