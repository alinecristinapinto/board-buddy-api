import express, { Request, Response } from 'express';
import { AuthenticationController } from '../adapters/controller/authentication/authentication-controller';

const router = express.Router();

// -------------- Authentication --------------
const authentication = new AuthenticationController();

router.post('/authentication/sign-up', async (req: Request, res: Response) => {
  const response = await authentication.signUp(req.body);
  return res.send(response);
});

router.post('/authentication/sign-in', async (req: Request, res: Response) => {
  const response = await authentication.signIn(req.body);
  return res.send(response);
});
// -------------- End Authentication --------------

export default router;
