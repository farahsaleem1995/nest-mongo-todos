import { IsNotEmpty, IsString } from 'class-validator';

import { ICreateTodoTypeProperty } from '../interfaces';

export class CreateTodoTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  properties: ICreateTodoTypeProperty[];
}
