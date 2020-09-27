import { ClassType } from 'class-transformer/ClassTransformer';
import { FilterQuery, QueryPopulateOptions } from 'mongoose';

import { IBaseQuery } from '.';

export interface IDbQuery {
  query: IDbFindManyQuery | IDbFindOneQuery | IDbAggregateQuery;
  queryType: QueryTypes;
}

export interface IDbFindManyQuery {
  criteria?: FilterQuery<any>;
  options?: IBaseQuery;
  references?: QueryPopulateOptions[];
}

export interface IDbFindOneQuery {
  criteria?: FilterQuery<any>;
  references?: QueryPopulateOptions[];
}

export interface IDbAggregateQuery {
  pipeline?: any[];
  resultType?: ClassType<any>;
}

export enum QueryTypes {
  FIND = 1,
  AGGREGATE = 2,
}
