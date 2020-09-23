import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Todo, TodoSchema, TodoType, TodoTypeSchema } from '../models';

export const imports: (
  | Type<any>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference<any>
)[] = [
  MongooseModule.forFeature([
    { name: Todo.name, schema: TodoSchema, collection: 'todos' },
    { name: TodoType.name, schema: TodoTypeSchema, collection: 'todo-types' },
  ]),
];
