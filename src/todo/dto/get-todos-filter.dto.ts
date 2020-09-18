import { Expose } from 'class-transformer';
import { Allow, IsIn, IsNotEmpty, IsOptional } from 'class-validator';

import { TodoStatus } from '../constants';

export class GetTodosFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsIn([TodoStatus.TODO, TodoStatus.DOING, TodoStatus.DONE])
  @Expose({ name: 'status' })
  status: string;

  @IsOptional()
  @IsNotEmpty()
  @Expose({ name: 'search' })
  title: string;
}
