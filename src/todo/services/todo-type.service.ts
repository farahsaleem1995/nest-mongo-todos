import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import {
  CreateTodoTypeDto,
  GetTodoTypesQueryDto,
  TodoTypeDto,
  UpdateTodoTypeDto,
} from '../dto';
import { ITodoTypeRepository } from '../interfaces';

@Injectable()
export class TodoTypeService {
  constructor(
    @Inject('ITodoTypeRepository')
    private readonly todoTypeRepository: ITodoTypeRepository,
  ) {}
  async getAll(
    getTodoTypesQueryDto: GetTodoTypesQueryDto,
  ): Promise<TodoTypeDto[]> {
    const { filter, query } = GetTodoTypesQueryDto.toModel(
      getTodoTypesQueryDto,
    );
    const todoTypes = await this.todoTypeRepository.findAll({
      filter,
      query,
    });

    return TodoTypeDto.fromModelArray(todoTypes);
  }

  async getById(id: string): Promise<TodoTypeDto> {
    const todoType = await this.todoTypeRepository.find({
      criteria: { _id: id },
    });

    if (!todoType) {
      throw new NotFoundException();
    }

    return TodoTypeDto.fromModel(todoType);
  }

  async create(createTodoTypeDto: CreateTodoTypeDto): Promise<TodoTypeDto> {
    const todoType = CreateTodoTypeDto.toModel(createTodoTypeDto);

    const createdTodoType = await this.todoTypeRepository.create(todoType);

    return TodoTypeDto.fromModel(createdTodoType);
  }

  async update(
    id: string,
    updateTododTypeDto: UpdateTodoTypeDto,
  ): Promise<void> {
    const todoType = UpdateTodoTypeDto.toModel(updateTododTypeDto);

    const updateResult = await this.todoTypeRepository.update(id, todoType);

    if (updateResult.ok !== 1) {
      throw new InternalServerErrorException();
    }

    if (!updateResult.lastErrorObject.updatedExisting) {
      throw new NotFoundException();
    }
  }

  async delete(id: string): Promise<void> {
    const deletdResult = await this.todoTypeRepository.delete(id);

    if (deletdResult.ok !== 1) {
      throw new InternalServerErrorException();
    }

    if (deletdResult.deletedCount === 0) {
      throw new NotFoundException();
    }
  }
}
