import { Controller, Route, Tags, Get, SuccessResponse, Security, Path } from 'tsoa';

import { Profile } from '../../../core/profile/ports/profile.types';
import { ProfileServices } from '../../../core/profile/usecases/profile-services';
import { ProfileRepository } from '../../db/postgresql-supabase/profile/profile-repository';
import { APIException } from '../../../core/helpers/api-exception';

@Route('profiles')
@Tags('Profile')
export class ProfileController extends Controller {
  @SuccessResponse('200', 'Ok')
  @Security('jwt')
  @Get()
  public async getAll(): Promise<Profile[]> {
    try {
      this.setStatus(200);
      return await new ProfileServices(new ProfileRepository()).getAll();
    } catch (error) {
      if (error instanceof APIException) {
        this.setStatus(error.status || 500);
      }
      throw error;
    }
  }

  @SuccessResponse('200', 'Ok')
  @Security('jwt')
  @Get('/{id}/details')
  public async getDetails(@Path() id: string): Promise<Profile> {
    try {
      this.setStatus(200);
      return await new ProfileServices(new ProfileRepository()).getDetails({ id });
    } catch (error) {
      if (error instanceof APIException) {
        this.setStatus(error.status || 500);
      }
      throw error;
    }
  }
}
