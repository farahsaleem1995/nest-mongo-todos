import { TodoType } from '../../models';

export class TodoTypeDto {
  id: string;

  name: string;

  properties: any;

  required: string[];

  static fromModel(todoType: TodoType): TodoTypeDto {
    const { id, name, typeModel } = todoType;

    const todoTypeDto: TodoTypeDto = {
      id: id,
      name: name,
      properties: typeModel.properties,
      required: typeModel.required,
    };

    return todoTypeDto;
  }

  static fromModelArray(todoTypes: TodoType[]): TodoTypeDto[] {
    return todoTypes.map((todoType: TodoType) => this.fromModel(todoType));
  }
}
