import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as Ajv from 'ajv';

import {
  TodoDto,
  CreateTodoDto,
  UpdateTodoDto,
  GetTodosQueryDto,
} from '../dto';
import { TodoRepository, TodoTypeRepository } from '../repositories';
import { Todo, TodoType } from '../models';
import { TodoStatus } from '../constants';
import { BaseQuery, DeleteResult, UpdateResult } from '../../shared/interfaces';

@Injectable()
export class TodoService {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly todoTypeRepository: TodoTypeRepository,
  ) {}

  async getAll(getTodosQueryDto?: GetTodosQueryDto): Promise<TodoDto[]> {
    const filter: { title: string; status: string } = {
      title: getTodosQueryDto.title,
      status: getTodosQueryDto.status,
    };
    const query: BaseQuery = {
      sortBy: getTodosQueryDto.sortBy,
      isDescending: getTodosQueryDto.isDescending,
      page: getTodosQueryDto.page,
      pageSize: getTodosQueryDto.pageSize,
    };
    const todos = await this.todoRepository.findAll(filter, query);

    return TodoDto.fromModelArray(todos);
  }

  async getById(id: string): Promise<TodoDto> {
    const todo = await this.todoRepository.findById(id);

    if (!todo) {
      throw new NotFoundException();
    }

    return TodoDto.fromModel(todo);
  }

  async create(createTododDto: CreateTodoDto): Promise<TodoDto> {
    const { type, properties } = createTododDto;

    const todoType = await this.todoTypeRepository.findByName(type);
    if (!todoType) {
      throw new NotFoundException(`Todo type "${name}" not found`);
    }

    const isValidType: boolean = await this.validateType(properties, todoType);
    if (!isValidType) {
      throw new BadRequestException(
        `The provided properties is not valid for "${createTododDto.type}" type`,
      );
    }

    const createdTodo = await this.todoRepository.create({
      ...createTododDto,
      status: TodoStatus.TODO,
    });

    return TodoDto.fromModel(createdTodo);
  }

  async update(id: string, updateTododDto: UpdateTodoDto): Promise<TodoDto> {
    const updateResult: UpdateResult<Todo> = await this.todoRepository.update(
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
    const deletdResult: DeleteResult = await this.todoRepository.delete(id);

    if (deletdResult.ok !== 1) {
      throw new InternalServerErrorException();
    }

    if (deletdResult.deletedCount === 0) {
      throw new NotFoundException();
    }
  }

  private async validateType(obj: any, todoType: TodoType): Promise<boolean> {
    const ajv = new Ajv();
    const validate: Ajv.ValidateFunction = ajv.compile(todoType.typeModel);
    const valid: boolean | PromiseLike<any> = validate(obj);

    return !valid ? false : true;
  }
}
