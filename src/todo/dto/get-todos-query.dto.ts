import { Expose } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { TodoStatus } from '../constants';
import { ITodoFilter } from '../interfaces';
import { IBaseQuery } from '../../shared/interfaces';

export class GetTodosQueryDto implements IBaseQuery, ITodoFilter {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'sortBy' })
  sortBy: string;

  @IsOptional()
  @IsString()
  @IsIn(['1', '0'])
  @Expose({ name: 'isDescending' })
  isDescending: string;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Expose({ name: 'page' })
  page: number;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Expose({ name: 'pageSize' })
  pageSize: number;

  @IsOptional()
  @IsNotEmpty()
  @IsIn([TodoStatus.TODO, TodoStatus.DOING, TodoStatus.DONE])
  @Expose({ name: 'status' })
  status: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'search' })
  title: string;

  static toModel(
    getTodosQueryDto: GetTodosQueryDto,
  ): { filter: any; query: IBaseQuery } {
    const {
      title,
      status,
      sortBy,
      isDescending,
      page,
      pageSize,
    } = getTodosQueryDto;

    return {
      filter: { title, status },
      query: { sortBy, isDescending, page, pageSize },
    };
  }
}
