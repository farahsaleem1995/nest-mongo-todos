import { createSchema } from 'morphism';

import { TodoDto } from '../dto';
import { Todo } from '../models';

export const todoSchema = createSchema<TodoDto, Todo>({
  id: '_id',
  title: 'title',
  status: 'status',
  description: 'description',
  type: (iteratee: Todo): { id: string; name: string } => {
    if (iteratee) {
      if (Array.isArray(iteratee.type)) {
        return { id: iteratee.type[0]._id, name: iteratee.type[0].name };
      }
      return { id: iteratee.type._id, name: iteratee.type.name };
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
