import express, { Request, Response } from 'express';
import { AuthenticationController } from '../adapters/controller/authentication/authentication-controller';

const router = express.Router();

router.get('/authentication/sign-in', async (req: Request, res: Response) => {
  const controller = new AuthenticationController();
  const response = await controller.signIn(req.body);
  return res.send(response);
});

export default router;
