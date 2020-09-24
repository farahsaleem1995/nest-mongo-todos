import {
  CreateTodoDto,
  GetTodosQueryDto,
  TodoDto,
  UpdateTodoDto,
} from 'src/todo/dto';

export interface ITodoService {
  getAll(getTodoQueryDto: GetTodosQueryDto): Promise<TodoDto[]>;

  getById(id: string): Promise<TodoDto>;

  create(createTodoDto: CreateTodoDto): Promise<TodoDto>;

  update(id: string, updateTodoDto: UpdateTodoDto): Promise<void>;

  delete(id: string): Promise<void>;
}
