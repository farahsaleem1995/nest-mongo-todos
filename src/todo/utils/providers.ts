import { Provider } from '@nestjs/common';

import {
  CreateTodoTypeValidationPipe,
  TodoStatusValidationPipe,
} from '../pipes';
import { TodoRepository, TodoTypeRepository } from '../repositories';
import { TodoService, TodoTypeService } from '../services';

export const providers: Provider<any>[] = [
  {
    provide: 'ITodoRepository',
    useClass: TodoRepository,
  },
  {
    provide: 'ITodoTypeRepository',
    useClass: TodoTypeRepository,
  },
  {
    provide: 'ITodoService',
    useClass: TodoService,
  },
  {
    provide: 'ITodoTypeService',
    useClass: TodoTypeService,
  },
  TodoStatusValidationPipe,
  CreateTodoTypeValidationPipe,
];
