import { createSchema } from 'morphism';
import { TodoStatus } from 'src/todo/constants';

import { CreateTodoDto } from '../dto';
import { ITodo } from '../models';

export const createTodoSchema = createSchema<ITodo, CreateTodoDto>({
  title: 'title',
  description: 'description',
  status: () => {
    return TodoStatus.TODO;
  },
  type: (iteratee: CreateTodoDto): any => {
    return iteratee.type?.typeId;
  },
  properties: (iteratee: CreateTodoDto): any => {
    return iteratee.type?.properties;
  },
});
