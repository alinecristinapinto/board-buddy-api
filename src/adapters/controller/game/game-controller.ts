import { Controller, Get, Route, Tags, Post, Body, SuccessResponse, Security, Path } from 'tsoa';

import { GameRepository } from '../../db/postgresql-supabase/game/game-repository';

import { AddGame, Game } from '../../../core/game/ports/game.types';
import { GameServices } from '../../../core/game/usecases/game-services';
import { APIException } from '../../../core/helpers/api-exception';

@Route('games')
@Tags('Game')
export class GameController extends Controller {
  @SuccessResponse('201', 'Created')
  @Security('jwt')
  @Post('/add')
  public async add(@Body() body: AddGame): Promise<void> {
    try {
      this.setStatus(201);
      return await new GameServices(new GameRepository()).add(body);
    } catch (error) {
      if (error instanceof APIException) {
        this.setStatus(error.status || 500);
      }
      throw error;
    }
  }

  @SuccessResponse('200', 'Ok')
  @Security('jwt')
  @Get('/details/{id}')
  public async getDetails(@Path() id: number): Promise<Game> {
    try {
      this.setStatus(200);
      return await new GameServices(new GameRepository()).getDetails(id);
    } catch (error) {
      if (error instanceof APIException) {
        this.setStatus(error.status || 500);
      }
      throw error;
    }
  }

  @SuccessResponse('200', 'Ok')
  @Security('jwt')
  @Get()
  public async getAll(): Promise<Game[]> {
    try {
      this.setStatus(200);
      return await new GameServices(new GameRepository()).getAll();
    } catch (error) {
      if (error instanceof APIException) {
        this.setStatus(error.status || 500);
      }
      throw error;
    }
  }

  @SuccessResponse('200', 'Ok')
  @Security('jwt')
  @Get('{name}')
  public async getByName(@Path() name: string): Promise<Game[]> {
    try {
      this.setStatus(200);
      return await new GameServices(new GameRepository()).getByName(name);
    } catch (error) {
      if (error instanceof APIException) {
        this.setStatus(error.status || 500);
      }
      throw error;
    }
  }
}
