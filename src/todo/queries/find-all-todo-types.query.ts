import { GetTodoTypesQueryDto } from '../dto';
import { IDbQuery, QueryTypes } from '../../shared/interfaces';

export const findAllTodoTypesQuery = (
  getTodoTypesQuery: GetTodoTypesQueryDto,
): IDbQuery => {
  return {
    queryType: QueryTypes.FIND,
    query: {
      options: {
        sortBy: getTodoTypesQuery.sortBy,
        isDescending: getTodoTypesQuery.isDescending,
        page: getTodoTypesQuery.page,
        pageSize: getTodoTypesQuery.pageSize,
      },
    },
  };
};
