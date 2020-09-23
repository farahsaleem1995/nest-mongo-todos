import {
  CreateQuery,
  FilterQuery,
  Model,
  ModelPopulateOptions,
  QueryPopulateOptions,
  UpdateQuery,
} from 'mongoose';

import { BaseModel } from '../models';
import { BaseQuery, DeleteResult, UpdateResult } from '../interfaces';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export class BaseRepository<M extends BaseModel> {
  constructor(private readonly model: Model<M>) {}

  findAll(options?: {
    filter?: FilterQuery<M>;
    query?: BaseQuery;
    references?: QueryPopulateOptions[];
  }): Promise<M[]> {
    const { filter, query, references } = options;
    const mongoQuery: {
      filter?: any;
      sort: string;
      skip: number;
      limit: number;
    } = this.initQuery(query);

    mongoQuery.filter = filter ? this.excludeUndefinedProps(filter) : {};

    const dbQuery = this.model
      .find(mongoQuery.filter)
      .sort(mongoQuery.sort)
      .skip(mongoQuery.skip)
      .limit(mongoQuery.limit);

    if (references) {
      references.forEach((reference: ModelPopulateOptions) => {
        dbQuery.populate(reference);
      });
    }

    return dbQuery.exec();
  }

  find(
    criteria: FilterQuery<M>,
    references?: QueryPopulateOptions[],
  ): Promise<M> {
    const dbQuery = this.model.findOne(criteria);

    if (references)
      references.forEach((reference: ModelPopulateOptions) => {
        dbQuery.populate(reference);
      });

    return dbQuery.exec();
  }

  async create(createQuery: CreateQuery<M>): Promise<M> {
    const createdTodo = new this.model(createQuery);

    try {
      return await createdTodo.save();
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException();
      }
      throw new InternalServerErrorException();
    }
  }

  async update(
    id: string,
    updateQuery: UpdateQuery<M>,
  ): Promise<UpdateResult<M>> {
    const { lastErrorObject, value, ok }: any = await this.model
      .findOneAndUpdate({ _id: id as any }, updateQuery, {
        new: true,
        rawResult: true,
      })
      .exec();

    const result: UpdateResult<M> = { lastErrorObject, value, ok };

    return result;
  }

  async delete(id: string): Promise<DeleteResult> {
    const { n, ok, deletedCount } = await this.model
      .deleteOne({ _id: id as any })
      .exec();

    const result: DeleteResult = { n, ok, deletedCount };

    return result;
  }

  protected initQuery(
    queryObj?: BaseQuery,
  ): { sort: string; skip: number; limit: number } {
    if (!queryObj) {
      return {
        sort: '-_id',
        skip: 0,
        limit: 10,
      };
    }

    const { sortBy, isDescending, page, pageSize } = queryObj;

    const limit: number = pageSize ? pageSize : 10;
    const skip: number = page ? (page - 1) * pageSize : 0;
    const sort: string = sortBy
      ? isDescending === '0'
        ? sortBy
        : `-${sortBy}`
      : '-_id';

    return { sort, skip, limit };
  }

  protected excludeUndefinedProps(filterQuery: any): any {
    return Object.entries(filterQuery).reduce((accumulator, currentValue) => {
      const [key, value] = currentValue;

      if (value !== undefined) {
        accumulator[key] = value;
      }

      return accumulator;
    }, {});
  }
}
