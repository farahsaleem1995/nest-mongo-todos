import { TodoTypeProperty } from '../constants';

export interface ICreateTodoTypeProperty {
  name: string;

  type: TodoTypeProperty;

  isRequired: boolean;

  items?: ICreateTodoTypeProperty[];
}
