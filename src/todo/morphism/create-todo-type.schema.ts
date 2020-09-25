import { createSchema } from 'morphism';

import { CreateTodoTypeDto } from '../dto';
import { ITodoType } from '../models';
import { ISchemaModel } from '../../shared/interfaces';
import { buildSchema } from '../../shared/utils';

export const createTodoTypeSchema = createSchema<ITodoType, CreateTodoTypeDto>({
  name: 'name',
  typeModel: (iteratee: CreateTodoTypeDto): ISchemaModel => {
    return buildSchema(iteratee);
  },
});
