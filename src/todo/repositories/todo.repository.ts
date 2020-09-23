import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Todo } from '../models';
import { BaseRepository } from '../../shared/repositories';
import { ITodoRepository } from '../interfaces';

@Injectable()
export class TodoRepository extends BaseRepository<Todo>
  implements ITodoRepository {
  constructor(
    @InjectModel(Todo.name)
    private readonly todoModel: Model<Todo>,
  ) {
    super(todoModel);
  }
}
