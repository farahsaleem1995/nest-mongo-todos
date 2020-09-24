import { BaseModel } from '../models';

export interface IUpdateResult<M extends BaseModel> {
  lastErrorObject: {
    n: number;
    updatedExisting: boolean;
  };
  value: M;
  ok: number;
}
