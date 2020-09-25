import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import {
  TodoDto,
  CreateTodoDto,
  UpdateTodoDto,
  GetTodosQueryDto,
} from '../dto';
import { TodoType } from '../models';
import { TodoReference } from '../constants';
import {
  ITodoRepository,
  ITodoService,
  ITodoTypeRepository,
} from '../interfaces';
import { validateType } from '../../shared/utils';

@Injectable()
export class TodoService implements ITodoService {
  constructor(
    @Inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository,
    @Inject('ITodoTypeRepository')
    private readonly todoTypeRepository: ITodoTypeRepository,
  ) {}

  async getAll(getTodosQueryDto?: GetTodosQueryDto): Promise<TodoDto[]> {
    const { filter, query } = GetTodosQueryDto.toModel(getTodosQueryDto);
    const todos = await this.todoRepository.findAll({
      filter,
      query,
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

    await this.checkType({ typeId: typeId, properties: properties });

    const todo = CreateTodoDto.toModel(createTodoDto);
    const createdTodo = await this.todoRepository.create({ ...todo });

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
    const updateResult = await this.todoRepository.update(id, todo);

    if (updateResult.ok !== 1) {
      throw new InternalServerErrorException();
    }

    if (!updateResult.lastErrorObject.updatedExisting) {
      throw new NotFoundException();
    }
  }

  async delete(id: string): Promise<void> {
    const deletdResult = await this.todoRepository.delete(id);

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

    const isValidType: boolean = await validateType(
      properties,
      todoType.typeModel,
    );
    if (!isValidType) {
      throw new BadRequestException(
        `The provided properties is not valid for type with ID "${typeId}"`,
      );
    }

    return todoType;
  }
}
