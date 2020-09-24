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
  CreateTodoTypeDto,
  GetTodoTypesQueryDto,
  UpdateTodoTypeDto,
} from '../dto';
import { TodoTypeDto } from '../dto';
import { CreateTodoTypeValidationPipe } from '../pipes';
import { WhitelistValidationPipe } from '../../shared/pipes';
import { ITodoTypeService } from '../interfaces';

@Controller('todo-types')
export class TodoTypeController {
  constructor(
    @Inject('ITodoTypeService')
    private readonly todoTypeService: ITodoTypeService,
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
  @HttpCode(204)
  @UsePipes(ValidationPipe)
  patchTodoType(
    @Param('id') id: string,
    @Body() updateTodoTypeDto: UpdateTodoTypeDto,
  ): Promise<void> {
    return this.todoTypeService.update(id, updateTodoTypeDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTodo(@Param('id') id: string): Promise<void> {
    return this.todoTypeService.delete(id);
  }
}
