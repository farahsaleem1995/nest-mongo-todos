import { TodoTypeProperty } from '../constants';

export interface ITodoTypeProperty {
  name: string;

  type: TodoTypeProperty;

  isRequired: boolean;

  items?: ITodoTypeProperty[];
}
