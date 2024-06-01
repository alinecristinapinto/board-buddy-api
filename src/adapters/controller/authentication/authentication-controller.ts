import { Controller, Route, Tags, Post, Body, SuccessResponse } from 'tsoa';

import { AuthenticationApiAdapter } from '../../api/supabase/authentication-api-adapter';
import { UserResponse, UserSignIn, UserSignUp } from '../../../core/authentication/ports/authentication.types';

@Route('authentication')
@Tags('AuthenticationController')
export class AuthenticationController extends Controller {
  @SuccessResponse('201', 'Created')
  @Post('/sign-up')
  public async signUp(@Body() body: UserSignUp): Promise<void> {
    this.setStatus(201);
    return new AuthenticationApiAdapter().signUp(body);
  }

  @Post('/sign-in')
  public async signIn(@Body() body: UserSignIn): Promise<UserResponse> {
    return new AuthenticationApiAdapter().signIn(body);
  }
}
