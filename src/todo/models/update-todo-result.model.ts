import { Todo } from './todo.model';

export class UpdateTodoResult {
  lastErrorObject: {
    n: number;
    updatedExisting: boolean;
  };
  value: Todo;
  ok: number;
}
