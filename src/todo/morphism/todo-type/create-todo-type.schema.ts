import { createSchema } from 'morphism';

import { CreateTodoTypeDto } from '../../dto';
import { ITodoTypeModel } from '../../interfaces';
import { buildSchema } from '../../utils';
import { ITodoType } from '../../models';

export const createTodoTypeSchema = createSchema<ITodoType, CreateTodoTypeDto>({
  name: 'name',
  typeModel: (iteratee: CreateTodoTypeDto): ITodoTypeModel => {
    return buildSchema(iteratee);
  },
});
