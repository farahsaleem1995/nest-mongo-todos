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

import {
  CreateTodoTypeDto,
  GetTodoTypesQueryDto,
  UpdateTodoTypeDto,
} from '../dto';
import { TodoTypeDto } from '../dto/todo-type.dto';
import { CreateTodoTypeValidationPipe } from '../pipes';
import { TodoTypeService } from '../services';
import { WhitelistValidationPipe } from '../../shared/pipes';

@Controller('todo-type')
export class TodoTypeController {
  constructor(private readonly todoTypeService: TodoTypeService) {}

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
  getTodoTypes(
    @Query(new WhitelistValidationPipe(GetTodoTypesQueryDto))
    getTodoTypesQueryDto: GetTodoTypesQueryDto,
  ): Promise<TodoTypeDto[]> {
    return this.todoTypeService.getAll(getTodoTypesQueryDto);
  }

  @Get(':id')
  @HttpCode(200)
  getTodoType(@Param('id') id: string): Promise<TodoTypeDto> {
    return this.todoTypeService.getById(id);
  }

  @Post('')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  postTodoType(
    @Body(CreateTodoTypeValidationPipe) createTodoTypeDto: CreateTodoTypeDto,
  ): Promise<TodoTypeDto> {
    return this.todoTypeService.create(createTodoTypeDto);
  }

  @Patch(':id')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  patchTodoType(
    @Param('id') id: string,
    @Body() updateTodoTypeDto: UpdateTodoTypeDto,
  ): Promise<TodoTypeDto> {
    return this.todoTypeService.update(id, updateTodoTypeDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTodo(@Param('id') id: string): Promise<void> {
    return this.todoTypeService.delete(id);
  }
}
