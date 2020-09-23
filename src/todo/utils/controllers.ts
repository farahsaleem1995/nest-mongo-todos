import { Type } from '@nestjs/common';

import { TodoController, TodoTypeController } from '../controllers';

export const controllers: Type<any>[] = [TodoController, TodoTypeController];
