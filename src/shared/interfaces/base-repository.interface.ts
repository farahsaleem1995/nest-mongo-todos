import { BaseModel } from '../models';
import { UpdateResult, DeleteResult } from './';

export interface IBaseRepoistory<M extends BaseModel> {
  findAll(options?: {
    filter?: any;
    query?: any;
    references?: any;
  }): Promise<M[]>;

  find(options: { criteria: any; references?: any }): Promise<M>;

  create(createQuery: any): Promise<M>;

  update(id: string, updateQuery: any): Promise<UpdateResult<M>>;

  delete(id: string): Promise<DeleteResult>;
}
