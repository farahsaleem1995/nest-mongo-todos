import { TodoType } from '../models';

export class TodoTypeDto {
  name: string;

  properties: any;

  required: string[];

  static fromModel(todoType: TodoType): TodoTypeDto {
    const { name, typeModel } = todoType;

    const todoTypeDto: TodoTypeDto = {
      name: name,
      properties: typeModel.properties,
      required: typeModel.required,
    };

    return todoTypeDto;
  }
}
