import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IDeleteResult, IUpdateResult } from 'src/shared/interfaces';

import {
  CreateTodoTypeDto,
  GetTodoTypesQueryDto,
  TodoTypeDto,
  UpdateTodoTypeDto,
} from '../dto';
import {
  ITodoTypeProperty,
  ITodoTypeRepository,
  ITodoTypeModel,
} from '../interfaces';
import { TodoType } from '../models';

@Injectable()
export class TodoTypeService {
  constructor(
    @Inject('ITodoTypeRepository')
    private readonly todoTypeRepository: ITodoTypeRepository,
  ) {}
  async getAll(
    getTodoTypesQueryDto: GetTodoTypesQueryDto,
  ): Promise<TodoTypeDto[]> {
    const todoTypes: TodoType[] = await this.todoTypeRepository.findAll({
      query: getTodoTypesQueryDto,
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
    const todoType: {
      name: string;
      typeModel: ITodoTypeModel;
    } = {
      name: createTodoTypeDto.name,
      typeModel: this.buildSchema({
        properties: createTodoTypeDto.properties,
      }),
    };

    const createdTodoType = await this.todoTypeRepository.create(todoType);

    return TodoTypeDto.fromModel(createdTodoType);
  }

  async update(
    id: string,
    updateTododTypeDto: UpdateTodoTypeDto,
  ): Promise<void> {
    const updateResult: IUpdateResult<TodoType> = await this.todoTypeRepository.update(
      id,
      updateTododTypeDto,
    );

    if (updateResult.ok !== 1) {
      throw new InternalServerErrorException();
    }

    if (!updateResult.lastErrorObject.updatedExisting) {
      throw new NotFoundException();
    }
  }

  async delete(id: string): Promise<void> {
    const deletdResult: IDeleteResult = await this.todoTypeRepository.delete(
      id,
    );

    if (deletdResult.ok !== 1) {
      throw new InternalServerErrorException();
    }

    if (deletdResult.deletedCount === 0) {
      throw new NotFoundException();
    }
  }

  private buildSchema(obj: {
    properties: ITodoTypeProperty[];
  }): ITodoTypeModel {
    const typeProperties = obj.properties.reduce(
      (accumulator: any, currentValue: ITodoTypeProperty): any => {
        const propName: string = currentValue.name;
        const propType: string = currentValue.type;
        const items: any = currentValue.items
          ? JSON.stringify(this.buildSchema({ properties: currentValue.items }))
          : null;

        const jsonString: any = items
          ? JSON.parse(`{"${propName}":{"type":"${propType}","item":${items}}}`)
          : JSON.parse(`{"${propName}":{"type":"${propType}"}}`);

        accumulator[propName] = jsonString[propName];

        return accumulator;
      },
      {},
    );
    const requiredProperties: string[] = obj.properties
      .filter(prop => prop.isRequired)
      .map(prop => prop.name);

    return {
      type: 'object',
      properties: typeProperties,
      required: requiredProperties,
    };
  }
}
