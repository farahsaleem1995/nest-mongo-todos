import { createSchema } from 'morphism';

import { TodoDto } from '../dto';
import { Todo } from '../models';

export const todoSchema = createSchema<TodoDto, Todo>({
  id: 'id',
  title: 'title',
  status: 'status',
  description: 'description',
  type: (iteratee: Todo): { id: string; name: string } => {
    if (iteratee) {
      return { id: iteratee.type.id, name: iteratee.type.name };
    }
  },
  properties: 'properties',
  createdAt: (iteratee: Todo): string => {
    return iteratee.createdAt?.toISOString();
  },
  updatedAt: (iteratee: Todo): string => {
    return iteratee.updatedAt?.toISOString();
  },
});
