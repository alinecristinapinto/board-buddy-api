import { Express } from 'express';
import { signIn } from './adapters/controller/authentication/authentication-controller';

export const setupRoutes = (app: Express) => {
  app.post('/authentication/sign-in', signIn);
};
