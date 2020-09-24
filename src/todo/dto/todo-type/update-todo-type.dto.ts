import { IsOptional, IsString } from 'class-validator';

import { ITodoTypeProperty } from '../../interfaces';

export class UpdateTodoTypeDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  properties: ITodoTypeProperty[];
}
