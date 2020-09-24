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
import {
  IBaseQuery,
  IDeleteResult,
  IUpdateResult,
} from '../../shared/interfaces';

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
    const query: IBaseQuery = {
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
          select: '_id name',
        },
      ],
    });

    return TodoDto.fromModelArray(todos);
  }

  async getById(id: string): Promise<TodoDto> {
    const todo = await this.todoRepository.find({
      criteria: { _id: id },
      references: [{ path: TodoReference.TYPE, select: '_id name' }],
    });

    if (!todo) {
      throw new NotFoundException();
    }

    return TodoDto.fromModel(todo);
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodoDto> {
    const { typeId, properties } = createTodoDto.type;

    const todoType: TodoType = await this.checkType({
      typeId: typeId,
      properties: properties,
    });

    const todo = CreateTodoDto.toModel(createTodoDto);
    const createdTodo = await this.todoRepository.create({
      ...todo,
      status: TodoStatus.TODO,
      type: todoType,
    });

    return TodoDto.fromModel(createdTodo);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<void> {
    if (updateTodoDto.type) {
      const { typeId, properties } = updateTodoDto.type;

      if (typeId) {
        await this.checkType({ typeId: typeId, properties: properties });
      }
    }

    const todo = UpdateTodoDto.toModel(updateTodoDto);
    const updateResult: IUpdateResult<Todo> = await this.todoRepository.update(
      id,
      todo,
    );

    if (updateResult.ok !== 1) {
      throw new InternalServerErrorException();
    }

    if (!updateResult.lastErrorObject.updatedExisting) {
      throw new NotFoundException();
    }
  }

  async delete(id: string): Promise<void> {
    const deletdResult: IDeleteResult = await this.todoRepository.delete(id);

    if (deletdResult.ok !== 1) {
      throw new InternalServerErrorException();
    }

    if (deletdResult.deletedCount === 0) {
      throw new NotFoundException();
    }
  }

  private async checkType(data: {
    typeId: string;
    properties: any;
  }): Promise<TodoType> {
    const { typeId, properties } = data;

    const todoType = await this.todoTypeRepository.find({
      criteria: {
        _id: typeId,
      },
      references: [{ path: TodoReference.TYPE }],
    });
    if (!todoType) {
      throw new NotFoundException(`Todo type with ID "${typeId}" not found`);
    }

    const isValidType: boolean = await this.validateType(properties, todoType);
    if (!isValidType) {
      throw new BadRequestException(
        `The provided properties is not valid for type with ID "${typeId}"`,
      );
    }

    return todoType;
  }

  private async validateType(obj: any, todoType: TodoType): Promise<boolean> {
    const ajv = new Ajv();
    const validate: Ajv.ValidateFunction = ajv.compile(todoType.typeModel);
    const valid: boolean | PromiseLike<any> = validate(obj);

    return !valid ? false : true;
  }
}
