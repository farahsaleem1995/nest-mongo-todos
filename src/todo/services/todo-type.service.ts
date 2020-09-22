import { Injectable } from '@nestjs/common';
import * as Ajv from 'ajv';

import { CreateTodoTypeDto } from '../dto';
import { TodoTypeDto } from '../dto/todo-type.dto';
import { CreateTodoTypeProperty, TodoTypeModel } from '../interfaces';
import { TodoType } from '../models';
import { TodoTypeRepository } from '../repositories';

@Injectable()
export class TodoTypeService {
  constructor(private readonly todoTypeRepository: TodoTypeRepository) {}

  async create(createTodoTypeDto: CreateTodoTypeDto): Promise<TodoTypeDto> {
    const todoType: {
      name: string;
      typeModel: TodoTypeModel;
    } = {
      name: createTodoTypeDto.name,
      typeModel: this.buildSchema({
        properties: createTodoTypeDto.properties,
      }),
    };

    const createdTodoType = await this.todoTypeRepository.create(todoType);

    return TodoTypeDto.fromModel(createdTodoType);
  }

  private buildSchema(obj: {
    properties: CreateTodoTypeProperty[];
  }): TodoTypeModel {
    const typeProperties = obj.properties.reduce(
      (accumulator: any, currentValue: CreateTodoTypeProperty): any => {
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
