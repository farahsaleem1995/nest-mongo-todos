import {
  QueryPage,
  QueryPageSize,
  SortDiraction,
  SortKey,
} from '../../shared/decorators';
import { BaseQuery } from '../../shared/interfaces';

export class GetTodoTypesQueryDto implements BaseQuery {
  @SortKey(['name', 'createdAt', 'updatedAt'])
  sortBy: string;

  @SortDiraction()
  isDescending: string;

  @QueryPage()
  page: number;

  @QueryPageSize()
  pageSize: number;
}
