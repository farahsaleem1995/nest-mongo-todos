import { TodoReference } from '../constants';
import { GetTodosQueryDto } from '../dto';
import { IDbQuery, QueryTypes } from '../../shared/interfaces';

export const findAllTodosQuery = (
  getTodosQuery: GetTodosQueryDto,
): IDbQuery => {
  return {
    queryType: QueryTypes.FIND,
    query: {
      criteria: {
        title: getTodosQuery.title,
        status: getTodosQuery.status,
      },
      options: {
        sortBy: getTodosQuery.sortBy,
        isDescending: getTodosQuery.isDescending,
        page: getTodosQuery.page,
        pageSize: getTodosQuery.pageSize,
      },
      references: [
        {
          path: TodoReference.TYPE,
          select: '_id name',
        },
      ],
    },
  };
};
