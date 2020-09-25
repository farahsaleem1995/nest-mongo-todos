import { createSchema } from 'morphism';

import { CreateTodoDto, UpdateTodoDto } from '../dto';
import { ITodo } from '../models';

export const updateTodoSchema = createSchema<ITodo, UpdateTodoDto>({
  title: 'title',
  description: 'description',
  status: 'status',
  type: (iteratee: CreateTodoDto): any => {
    return iteratee.type?.typeId;
  },
  properties: (iteratee: CreateTodoDto) => {
    return iteratee.type?.properties;
  },
});
