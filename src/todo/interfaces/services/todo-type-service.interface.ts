import { TodoTypeDto } from '../../dto/todo-type.dto';
import {
  CreateTodoTypeDto,
  GetTodoTypesQueryDto,
  UpdateTodoTypeDto,
} from '../../dto';

export interface ITodoTypeService {
  getAll(getTodoTypeQueryDto: GetTodoTypesQueryDto): Promise<TodoTypeDto[]>;

  getById(id: string): Promise<TodoTypeDto>;

  create(createTodoTypeDto: CreateTodoTypeDto): Promise<TodoTypeDto>;

  update(id: string, updateTodoTypeDto: UpdateTodoTypeDto): Promise<void>;

  delete(id: string): Promise<void>;
}
