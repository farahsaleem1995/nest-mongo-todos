import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '../../shared/repositories';
import { TodoType } from '../models';

@Injectable()
export class TodoTypeRepository extends BaseRepository<TodoType> {
  constructor(
    @InjectModel(TodoType.name)
    private readonly todoTypeModel: Model<TodoType>,
  ) {
    super(todoTypeModel);
  }
}
