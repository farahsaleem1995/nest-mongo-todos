import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import {
  TodoDto,
  CreateTodoDto,
  UpdateTodoDto,
  GetTodosQueryDto,
} from '../dto';
import { WhitelistValidationPipe } from '../../shared/pipes';
import { ITodoService } from '../interfaces';

@Controller('todos')
export class TodoController {
  constructor(
    @Inject('ITodoService')
    private readonly todoService: ITodoService,
  ) {}
  @Get('')
  @HttpCode(200)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
  getTodos(
    @Query(new WhitelistValidationPipe(GetTodosQueryDto))
    getTodosQueryDto: GetTodosQueryDto,
  ): Promise<TodoDto[]> {
    return this.todoService.getAll(getTodosQueryDto);
  }

  @Get(':id')
  @HttpCode(200)
  GetTodo(@Param('id') id: string): Promise<TodoDto> {
    return this.todoService.getById(id);
  }

  @Post('')
  @HttpCode(201)
  postTodo(
    @Body(ValidationPipe) createTodoDto: CreateTodoDto,
  ): Promise<TodoDto> {
    return this.todoService.create(createTodoDto);
  }

  @Patch(':id')
  @HttpCode(204)
  patchTodo(
    @Param('id') id: string,
    @Body(ValidationPipe, new WhitelistValidationPipe(UpdateTodoDto))
    updateTodoDto: UpdateTodoDto,
  ): Promise<void> {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTodo(@Param('id') id: string): Promise<void> {
    return this.todoService.delete(id);
  }
}
