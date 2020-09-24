import { createSchema } from 'morphism';

import { UpdateTodoTypeDto } from '../../dto';
import { ITodoTypeModel } from '../../interfaces';
import { buildSchema } from '../../utils';
import { ITodoType } from '../../models';

export const updateTodoTypeSchema = createSchema<ITodoType, UpdateTodoTypeDto>({
  name: 'name',
  typeModel: (iteratee: UpdateTodoTypeDto): ITodoTypeModel => {
    return buildSchema(iteratee);
  },
});
