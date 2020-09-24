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
}
