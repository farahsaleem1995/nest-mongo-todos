import { IsNotEmpty, IsString } from 'class-validator';
import { morphism } from 'morphism';

import { ITodoType } from '../../models';
import { ITodoTypeProperty } from '../../interfaces';
import { createTodoTypeSchema } from '../../morphism/todo-type';

export class CreateTodoTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  properties: ITodoTypeProperty[];

  static toModel(createTodoTypeDto: CreateTodoTypeDto): ITodoType {
    return morphism(createTodoTypeSchema, createTodoTypeDto);
  }
}
