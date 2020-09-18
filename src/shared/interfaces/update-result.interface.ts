import { BaseModel } from '../models';

export interface UpdateResult<M extends BaseModel> {
  lastErrorObject: {
    n: number;
    updatedExisting: boolean;
  };
  value: M;
  ok: number;
}
