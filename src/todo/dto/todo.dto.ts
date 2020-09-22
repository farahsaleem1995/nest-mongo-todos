import { Expose } from 'class-transformer';

import { Todo } from '../models';

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
  type: string;

  @Expose()
  properties: any;

  @Expose()
  createdAt?: string;

  @Expose()
  updatedAt?: string;

  static fromModel(todo: Todo): TodoDto {
    const {
      id,
      title,
      status,
      description,
      type,
      properties,
      createdAt,
      updatedAt,
    } = todo;
    const todoDto: TodoDto = {
      id: id,
      title: title,
      status: status,
      description: description,
      type: type,
      properties: properties,
      createdAt: createdAt?.toISOString(),
      updatedAt: updatedAt?.toISOString(),
    };

    return todoDto;
  }

  static fromModelArray(todos: Todo[]): TodoDto[] {
    return todos.map((todo: Todo) => {
      const {
        id,
        title,
        status,
        description,
        type,
        properties,
        createdAt,
        updatedAt,
      } = todo;
      const todoDto: TodoDto = {
        id: id,
        title: title,
        status: status,
        description: description,
        type: type,
        properties: properties,
        createdAt: createdAt?.toISOString(),
        updatedAt: updatedAt?.toISOString(),
      };

      return todoDto;
    });
  }
}
