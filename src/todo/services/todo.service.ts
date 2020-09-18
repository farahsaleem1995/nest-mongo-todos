import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { TodoDto, CreateTodoDto, UpdateTodoDto } from '../dto';
import { UpdateTodoResult, DeleteTodoResult } from '../models';
import { TodoRepository } from '../repositories';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async getAll(): Promise<TodoDto[]> {
    const todos = await this.todoRepository.findAll();

    return TodoDto.fromModelArray(todos);
  }

  async getById(id: string): Promise<TodoDto> {
    const todo = await this.todoRepository.find(id);

    if (!todo) {
      throw new NotFoundException();
    }

    return TodoDto.fromModel(todo);
  }

  async create(createTododDto: CreateTodoDto): Promise<TodoDto> {
    const createdTodo = await this.todoRepository.create(createTododDto);

    return TodoDto.fromModel(createdTodo);
  }

  async update(id: string, updateTododDto: UpdateTodoDto): Promise<TodoDto> {
    const updateResult: UpdateTodoResult = await this.todoRepository.update(
      id,
      updateTododDto,
    );

    if (updateResult.ok !== 1) {
      throw new InternalServerErrorException();
    }

    if (!updateResult.lastErrorObject.updatedExisting) {
      throw new NotFoundException();
    }

    return TodoDto.fromModel(updateResult.value);
  }

  async delete(id: string): Promise<void> {
    const deletdResult: DeleteTodoResult = await this.todoRepository.delete(id);

    if (deletdResult.ok !== 1) {
      throw new InternalServerErrorException();
    }

    if (deletdResult.deletedCount === 0) {
      throw new NotFoundException();
    }
  }
}
