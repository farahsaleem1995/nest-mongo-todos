import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Todo } from '../models';
import { BaseRepository } from 'src/shared/repositories';
import { CreateTodoDto, UpdateTodoDto } from '../dto';

@Injectable()
export class TodoRepository extends BaseRepository<Todo> {
  constructor(
    @InjectModel(Todo.name)
    private readonly todoModel: Model<Todo>,
  ) {
    super(todoModel);
  }
}
