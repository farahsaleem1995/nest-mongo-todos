import { createSchema } from 'morphism';

import { UpdateTodoTypeDto } from '../dto';
import { ITodoType } from '../models';
import { ISchemaModel } from '../../shared/interfaces';
import { buildSchema } from '../../shared/utils';

export const updateTodoTypeSchema = createSchema<ITodoType, UpdateTodoTypeDto>({
  name: 'name',
  typeModel: (iteratee: UpdateTodoTypeDto): ISchemaModel => {
    return buildSchema(iteratee);
  },
});
