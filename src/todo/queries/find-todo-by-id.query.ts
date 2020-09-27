import { TodoReference } from '../constants';
import { IDbFindOneQuery } from '../../shared/interfaces';

export const findTodoByIdQuery = (id: string): IDbFindOneQuery => {
  return {
    criteria: { _id: id },
    references: [{ path: TodoReference.TYPE, select: '_id name' }],
  };
};
