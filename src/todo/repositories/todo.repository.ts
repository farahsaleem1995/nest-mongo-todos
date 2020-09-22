import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Todo } from '../models';
import { BaseRepository } from 'src/shared/repositories';
import { BaseQuery } from 'src/shared/interfaces';

@Injectable()
export class TodoRepository extends BaseRepository<Todo> {
  constructor(
    @InjectModel(Todo.name)
    private readonly todoModel: Model<Todo>,
  ) {
    super(todoModel);
  }

  findAllWithTypes(options: {
    filterQuery?: {
      title: string;
      status: string;
    };
    queryObj?: BaseQuery;
  }): Promise<Todo[]> {
    const { filterQuery, queryObj } = options;

    const query: {
      filter?: any;
      sort: string;
      skip: number;
      limit: number;
    } = this.initQuery(queryObj);

    query.filter = filterQuery ? this.excludeUndefinedProps(filterQuery) : {};

    return this.todoModel
      .find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .populate('type')
      .exec();
  }

  findByIdWithTypes(id: string): Promise<Todo> {
    return this.todoModel
      .findOne({ _id: id as any })
      .populate('type')
      .exec();
  }
}
