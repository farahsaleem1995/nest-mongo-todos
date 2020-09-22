import { IsOptional, IsString } from 'class-validator';

import { CreateTodoTypeProperty } from '../interfaces';

export class UpdateTodoTypeDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  properties: CreateTodoTypeProperty[];
}
