import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodoController } from './controllers';
import { TodoService } from './services';
import { TodoRepository } from './repositories';
import { Todo, TodoSchema } from './models';
import { GetTodosQueryPipe, TodoStatusValidationPipe } from './pipes/';

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
    GetTodosQueryPipe,
  ],
})
export class TodoModule {}
