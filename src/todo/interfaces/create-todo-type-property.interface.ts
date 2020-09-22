import { TodoTypeProperty } from '../constants';

export interface CreateTodoTypeProperty {
  name: string;

  type: TodoTypeProperty;

  isRequired: boolean;

  items?: CreateTodoTypeProperty[];
}
