import { Controller, Route, Tags, Post, Body, SuccessResponse, Security } from 'tsoa';

import { GameRepository } from '../../db/postgresql-supabase/game/game-repository';

import { Game } from '../../../core/game/ports/game.types';
import { GameServices } from '../../../core/game/usecases/game-services';

@Route('game')
@Tags('Game')
export class GameController extends Controller {
  @SuccessResponse('201', 'Created')
  //   @Security('jwt')
  @Post('/add')
  public async add(@Body() body: Game): Promise<void> {
    this.setStatus(201);
    return new GameServices(new GameRepository()).add(body);
  }
}
