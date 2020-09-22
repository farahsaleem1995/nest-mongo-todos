import { IsNotEmpty, IsString } from 'class-validator';

import { CreateTodoTypeProperty } from '../interfaces';

export class CreateTodoTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  properties: CreateTodoTypeProperty[];
}
