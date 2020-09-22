import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodoController, TodoTypeController } from './controllers';
import { TodoService, TodoTypeService } from './services';
import { TodoRepository, TodoTypeRepository } from './repositories';
import { Todo, TodoSchema, TodoType, TodoTypeSchema } from './models';
import {
  CreateTodoTypeValidationPipe,
  TodoStatusValidationPipe,
} from './pipes/';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema, collection: 'todos' },
      { name: TodoType.name, schema: TodoTypeSchema, collection: 'todo-types' },
    ]),
  ],
  controllers: [TodoController, TodoTypeController],
  providers: [
    TodoService,
    TodoRepository,
    TodoTypeRepository,
    TodoStatusValidationPipe,
    CreateTodoTypeValidationPipe,
    TodoTypeService,
  ],
})
export class TodoModule {}
