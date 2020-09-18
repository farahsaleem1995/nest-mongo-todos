import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodoController } from './controllers';
import { TodoService } from './services';
import { TodoRepository } from './repositories';
import { Todo, TodoSchema } from './models';
import { TodoStatusValidationPipe } from './pipes/';
import { GetTodoFilterPipe } from './pipes/get-todo-filter.pipe';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema, collection: 'todos' },
    ]),
  ],
  controllers: [TodoController],
  providers: [
    TodoService,
    TodoRepository,
    TodoStatusValidationPipe,
    GetTodoFilterPipe,
  ],
})
export class TodoModule {}
