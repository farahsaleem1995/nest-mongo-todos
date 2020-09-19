import { Expose, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseQuery } from '../../shared/interfaces';
import { TodoStatus } from '../constants';

export class GetTodosQueryDto implements BaseQuery {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'sortBy' })
  sortBy: string;

  @IsOptional()
  @IsBoolean()
  @Expose({ name: 'isDescending' })
  isDescending: boolean;

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
}
