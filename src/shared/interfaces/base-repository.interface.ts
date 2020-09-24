import { IUpdateResult, IDeleteResult } from './';
import { BaseModel } from '../models';

export interface IBaseRepoistory<M extends BaseModel> {
  findAll(options?: {
    filter?: any;
    query?: any;
    references?: any;
  }): Promise<M[]>;

  find(options: { criteria: any; references?: any }): Promise<M>;

  create(createQuery: any): Promise<M>;

  update(id: string, updateQuery: any): Promise<IUpdateResult<M>>;

  delete(id: string): Promise<IDeleteResult>;
}
