import { Controller, Get, Route, Tags, Post, Body, SuccessResponse, Security, Path } from 'tsoa';

import { GameRepository } from '../../db/postgresql-supabase/game/game-repository';

import { AddGame, Game } from '../../../core/game/ports/game.types';
import { GameServices } from '../../../core/game/usecases/game-services';

@Route('games')
@Tags('Game')
export class GameController extends Controller {
  @SuccessResponse('201', 'Created')
  //   @Security('jwt')
  @Post('/add')
  public async add(@Body() body: AddGame): Promise<void> {
    this.setStatus(201);
    return new GameServices(new GameRepository()).add(body);
  }

  @SuccessResponse('200', 'Ok')
  //   @Security('jwt')
  @Get('/details/{id}')
  public async getDetails(@Path() id: number): Promise<Game> {
    this.setStatus(200);
    return new GameServices(new GameRepository()).getDetails(id);
  }

  @SuccessResponse('200', 'Ok')
  //   @Security('jwt')
  @Get()
  public async getAll(): Promise<Game[]> {
    this.setStatus(200);
    return new GameServices(new GameRepository()).getAll();
  }

  @SuccessResponse('200', 'Ok')
  //   @Security('jwt')
  @Get('{name}')
  public async getByName(@Path() name: string): Promise<Game[]> {
    this.setStatus(200);
    return new GameServices(new GameRepository()).getByName(name);
  }
}
