import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  CreateQuery,
  Model,
  ModelPopulateOptions,
  UpdateQuery,
} from 'mongoose';

import { BaseModel } from '../models';
import {
  IBaseQuery,
  IDeleteResult,
  IUpdateResult,
  IBaseRepoistory,
} from '../interfaces';
import {
  IDbAggregateQuery,
  IDbFindManyQuery,
  IDbFindOneQuery,
  IDbQuery,
  QueryTypes,
} from '../interfaces/db-query.interface';

export class BaseRepository<M extends BaseModel> implements IBaseRepoistory<M> {
  constructor(private readonly model: Model<M>) {}

  findAll(options?: IDbQuery): Promise<any[]> {
    if (!options) {
      return this.model.find().exec();
    }

    if (options.queryType === QueryTypes.FIND) {
      return this.handleFindQuery(options.query as IDbFindManyQuery);
    } else {
      return this.handleAggregateQueru(
        (options.query as IDbAggregateQuery).pipeline,
      );
    }
  }

  find(options: IDbFindOneQuery): Promise<M> {
    const { criteria, references } = options;
    const dbQuery = this.model.findOne(criteria);

    if (references) {
      references.forEach((reference: ModelPopulateOptions) => {
        dbQuery.populate(reference);
      });
    }

    return dbQuery.exec();
  }

  findById(id: string): Promise<M> {
    return this.model.findById(id).exec();
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
  ): Promise<IUpdateResult<M>> {
    const updateModel: any = this.excludeUndefinedProps(updateQuery);

    const { lastErrorObject, value, ok }: any = await this.model
      .findOneAndUpdate({ _id: id as any }, updateModel, {
        new: true,
        rawResult: true,
      })
      .exec();

    const result: IUpdateResult<M> = { lastErrorObject, value, ok };

    return result;
  }

  async delete(id: string): Promise<IDeleteResult> {
    const { n, ok, deletedCount } = await this.model
      .deleteOne({ _id: id as any })
      .exec();

    const result: IDeleteResult = { n, ok, deletedCount };

    return result;
  }

  protected initQuery(
    queryObj?: IBaseQuery,
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

  protected excludeUndefinedProps(obj: any): any {
    return Object.entries(obj).reduce((accumulator, currentValue) => {
      const [key, value] = currentValue;

      if (value !== undefined) {
        accumulator[key] = value;
      }

      return accumulator;
    }, {});
  }

  private handleFindQuery(options?: IDbFindManyQuery): Promise<M[]> {
    const { criteria, options: query, references } = options;
    const mongoQuery: {
      filter?: any;
      sort: string;
      skip: number;
      limit: number;
    } = this.initQuery(query);

    mongoQuery.filter = criteria ? this.excludeUndefinedProps(criteria) : {};

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

  private handleAggregateQueru(pipeline: any[]): Promise<any[]> {
    const modifiedPipeline: any[] = [];
    pipeline.forEach((obj: any) => {
      Object.entries(obj).forEach((entry: [string, any]): void => {
        const [key, value] = entry;

        if (key === '$match') {
          const modifiedValue = this.excludeUndefinedProps(value);
          obj[key] = modifiedValue;
        }
        modifiedPipeline.push(obj);
      });
    });

    return this.model.aggregate(modifiedPipeline).exec();
  }
}
