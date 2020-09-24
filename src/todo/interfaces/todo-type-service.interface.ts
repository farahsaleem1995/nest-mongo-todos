import {
  CreateTodoTypeDto,
  GetTodoTypesQueryDto,
  TodoTypeDto,
  UpdateTodoTypeDto,
} from '../dto';

export interface ITodoTypeService {
  getAll(getTodoTypeQueryDto: GetTodoTypesQueryDto): Promise<TodoTypeDto[]>;

  getById(id: string): Promise<TodoTypeDto>;

  create(createTodoTypeDto: CreateTodoTypeDto): Promise<TodoTypeDto>;

  update(id: string, updateTodoTypeDto: UpdateTodoTypeDto): Promise<void>;

  delete(id: string): Promise<void>;
}
