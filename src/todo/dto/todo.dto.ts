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
  createdAt?: string;

  @Expose()
  updatedAt?: string;

  static fromModel(todo: Todo): TodoDto {
    const { id, title, description, status, createdAt, updatedAt } = todo;
    const todoDto: TodoDto = {
      id: id,
      title: title,
      description: description,
      status: status,
      createdAt: createdAt?.toISOString(),
      updatedAt: updatedAt?.toISOString(),
    };

    return todoDto;
  }

  static fromModelArray(todos: Todo[]): TodoDto[] {
    return todos.map((todo: Todo) => {
      const { id, title, description, status, createdAt, updatedAt } = todo;
      const todoDto: TodoDto = {
        id: id,
        title: title,
        description: description,
        status: status,
        createdAt: createdAt?.toISOString(),
        updatedAt: updatedAt?.toISOString(),
      };

      return todoDto;
    });
  }
}
