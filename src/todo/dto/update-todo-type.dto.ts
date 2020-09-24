import { IsOptional, IsString } from 'class-validator';

import { ICreateTodoTypeProperty } from '../interfaces';

export class UpdateTodoTypeDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  properties: ICreateTodoTypeProperty[];
}
