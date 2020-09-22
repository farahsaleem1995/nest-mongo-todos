import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { TodoService } from '../services';
import {
  TodoDto,
  CreateTodoDto,
  UpdateTodoDto,
  GetTodosQueryDto,
} from '../dto';
import { GetTodosQueryValidationPipe } from '../pipes';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get('')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  getTodos(
    @Query(GetTodosQueryValidationPipe) getTodosQueryDto: GetTodosQueryDto,
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
  @HttpCode(200)
  patchTodo(
    @Param('id') id: string,
    @Body(ValidationPipe) updateTodoDto: UpdateTodoDto,
  ): Promise<TodoDto> {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTodo(@Param('id') id: string): Promise<void> {
    return this.todoService.delete(id);
  }
}
