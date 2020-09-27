import { IUpdateResult, IDeleteResult } from './';
import { BaseModel } from '../models';
import { IDbFindOneQuery, IDbQuery } from './db-query.interface';

export interface IBaseRepoistory<M extends BaseModel> {
  findAll(options?: IDbQuery): Promise<M[]>;

  find(options: IDbFindOneQuery): Promise<M>;

  findById(id: string): Promise<M>;

  create(createQuery: any): Promise<M>;

  update(id: string, updateQuery: any): Promise<IUpdateResult<M>>;

  delete(id: string): Promise<IDeleteResult>;
}
