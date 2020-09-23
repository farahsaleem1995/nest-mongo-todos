import {
  BadRequestException,
  Inject,
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
import { Todo, TodoType } from '../models';
import { TodoReference, TodoStatus } from '../constants';
import {
  ITodoRepository,
  ITodoService,
  ITodoTypeRepository,
} from '../interfaces';
import { BaseQuery, DeleteResult, UpdateResult } from '../../shared/interfaces';

@Injectable()
export class TodoService implements ITodoService {
  constructor(
    @Inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository,
    @Inject('ITodoTypeRepository')
    private readonly todoTypeRepository: ITodoTypeRepository,
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
    const todos = await this.todoRepository.findAll({
      filter: filter,
      query: query,
      references: [
        {
          path: TodoReference.TYPE,
          select: 'name',
        },
      ],
    });

    return TodoDto.fromModelArray(todos);
  }

  async getById(id: string): Promise<TodoDto> {
    const todo = await this.todoRepository.find({
      criteria: { _id: id },
      references: [{ path: TodoReference.TYPE, select: 'name' }],
    });

    if (!todo) {
      throw new NotFoundException();
    }

    return TodoDto.fromModel(todo);
  }

  async create(createTododDto: CreateTodoDto): Promise<TodoDto> {
    const { type, properties } = createTododDto;

    const todoType = await this.todoTypeRepository.find({
      criteria: {
        name: type,
      },
      references: [{ path: TodoReference.TYPE }],
    });
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
      type: todoType,
    });

    return TodoDto.fromModel(createdTodo);
  }

  async update(id: string, updateTododDto: UpdateTodoDto): Promise<void> {
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
