import { createSchema } from 'morphism';

import { TodoTypeDto } from '../../dto';
import { TodoType } from '../../models';

export const todoTypeSchema = createSchema<TodoTypeDto, TodoType>({
  id: 'id',
  name: 'name',
  properties: 'typeModel.properties',
  required: 'typeModel.required',
});
