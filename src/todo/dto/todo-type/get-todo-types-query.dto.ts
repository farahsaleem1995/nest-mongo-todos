import {
  QueryPage,
  QueryPageSize,
  SortDiraction,
  SortKey,
} from '../../../shared/decorators';
import { IBaseQuery } from '../../../shared/interfaces';

export class GetTodoTypesQueryDto implements IBaseQuery {
  @SortKey(['name', 'createdAt', 'updatedAt'])
  sortBy: string;

  @SortDiraction()
  isDescending: string;

  @QueryPage()
  page: number;

  @QueryPageSize()
  pageSize: number;

  static toModel(
    getTodoTypesQueryDto: GetTodoTypesQueryDto,
  ): { filter: any; query: IBaseQuery } {
    const { sortBy, isDescending, page, pageSize } = getTodoTypesQueryDto;

    return {
      filter: {},
      query: { sortBy, isDescending, page, pageSize },
    };
  }
}
