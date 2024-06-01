import { Controller, Route, Tags, Post, Body } from 'tsoa';

import { AuthenticationApiAdapter } from '../../api/supabase/authentication-api-adapter';
import { UserSignIn } from '../../../core/authentication/ports/authentication.types';

@Route('authentication')
@Tags('AuthenticationController')
export class AuthenticationController extends Controller {
  @Post('/sign-in')
  signIn(@Body() body: UserSignIn) {
    const { signIn } = new AuthenticationApiAdapter();
  }
}
