import { Controller, Route, Tags, Get, SuccessResponse, Security, Path } from 'tsoa';

import { Profile } from '../../../core/profile/ports/profile.types';
import { ProfileServices } from '../../../core/profile/usecases/profile-services';
import { ProfileRepository } from '../../db/postgresql-supabase/profile/profile-repository';

@Route('profiles')
@Tags('Profile')
export class ProfileController extends Controller {
  @SuccessResponse('200', 'Ok')
  //   @Security('jwt')
  @Get()
  public async getAll(): Promise<Profile[]> {
    this.setStatus(200);
    return new ProfileServices(new ProfileRepository()).getAll();
  }

  @SuccessResponse('200', 'Ok')
  //   @Security('jwt')
  @Get('/{id}/details')
  public async getDetails(@Path() id: string): Promise<Profile> {
    this.setStatus(200);
    return new ProfileServices(new ProfileRepository()).getDetails({ id });
  }
}
