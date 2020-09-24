import { morphism } from 'morphism';

import { TodoType } from '../../models';
import { todoTypeSchema } from '../../morphism';

export class TodoTypeDto {
  id: string;

  name: string;

  properties: any;

  required: string[];

  static fromModel(todoType: TodoType): TodoTypeDto {
    return morphism(todoTypeSchema, todoType);
  }

  static fromModelArray(todoTypes: TodoType[]): TodoTypeDto[] {
    return morphism(todoTypeSchema, todoTypes);
  }
}
