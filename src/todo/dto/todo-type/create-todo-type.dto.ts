import { IsNotEmpty, IsString } from 'class-validator';

import { ITodoTypeProperty } from '../../interfaces';

export class CreateTodoTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  properties: ITodoTypeProperty[];
}
