import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTodoTypeDto } from '../dto';
import { TodoTypeDto } from '../dto/todo-type.dto';
import { CreateTodoTypeValidationPipe } from '../pipes';
import { TodoTypeService } from '../services';

@Controller('todo-type')
export class TodoTypeController {
  constructor(private readonly todoTypeService: TodoTypeService) {}

  @Post('')
  @UsePipes(ValidationPipe)
  postTodoType(
    @Body(CreateTodoTypeValidationPipe) createTodoTypeDto: CreateTodoTypeDto,
  ): Promise<TodoTypeDto> {
    return this.todoTypeService.create(createTodoTypeDto);
  }
}
