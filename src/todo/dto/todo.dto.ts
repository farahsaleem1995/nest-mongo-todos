import { Expose } from 'class-transformer';
import { morphism } from 'morphism';

import { Todo } from '../models';
import { todoSchema } from '../morphism';

export class TodoDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  status: string;

  @Expose()
  description: string;

  @Expose()
  type: { id: string; name: string };

  @Expose()
  properties: any;

  @Expose()
  createdAt?: string;

  @Expose()
  updatedAt?: string;

  static fromModel(todo: Todo): TodoDto {
    return morphism(todoSchema, todo);
  }

  static fromModelArray(todos: Todo[]): TodoDto[] {
    return todos.map((todo: Todo) => this.fromModel(todo));
  }
}
