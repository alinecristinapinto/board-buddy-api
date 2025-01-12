import { Controller, Route, Tags, Post, Body, SuccessResponse } from 'tsoa';

import { AuthenticationApiAdapter } from '../../api/supabase/authentication-api-adapter';
import { UserResponse, UserSignIn, UserSignUp } from '../../../core/authentication/ports/authentication.types';
import { APIException } from '../../../core/helpers/api-exception';

@Route('authentication')
@Tags('Authentication')
export class AuthenticationController extends Controller {
  @SuccessResponse('201', 'Created')
  @Post('/sign-up')
  public async signUp(@Body() body: UserSignUp): Promise<void> {
    try {
      this.setStatus(201);
      await new AuthenticationApiAdapter().signUp(body);
    } catch (error) {
      if (error instanceof APIException) {
        this.setStatus(error.status || 500);
      }
      throw error;
    }
  }

  @SuccessResponse('200', 'Ok')
  @Post('/sign-in')
  public async signIn(@Body() body: UserSignIn): Promise<UserResponse> {
    try {
      this.setStatus(200);
      return await new AuthenticationApiAdapter().signIn(body);
    } catch (error) {
      if (error instanceof APIException) {
        this.setStatus(error.status || 500);
      }
      throw error;
    }
  }
}
