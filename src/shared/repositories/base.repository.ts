import { CreateQuery, FilterQuery, Model, UpdateQuery } from 'mongoose';

import { BaseModel } from '../models';
import { BaseQuery, DeleteResult, UpdateResult } from '../interfaces';

export class BaseRepository<M extends BaseModel> {
  constructor(private readonly model: Model<M>) {}

  findAll(filterQuery?: FilterQuery<M>, queryObj?: BaseQuery): Promise<M[]> {
    const filter: any = this.excludeUndefinedProps(filterQuery);

    const limit: number = queryObj.pageSize;
    const skip: number = queryObj.page ? queryObj.page : 1;

    let sortString: string;
    if (queryObj.sortBy) {
      sortString = queryObj.sortBy.toString();
      if (queryObj.isDescending) {
        sortString = `-${sortString}`;
      }
    }

    return this.model
      .find(filter)
      .sort(sortString ? sortString : { _id: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  findById(id: string): Promise<M> {
    return this.model.findOne({ _id: id as any }).exec();
  }

  create(createQuery: CreateQuery<M>): Promise<M> {
    const createdTodo = new this.model(createQuery);

    return createdTodo.save();
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

  private excludeUndefinedProps(filterQuery: any): any {
    return Object.entries(filterQuery).reduce((accumulator, currentValue) => {
      const [key, value] = currentValue;

      if (value !== undefined) {
        accumulator[key] = value;
      }

      return accumulator;
    }, {});
  }
}
