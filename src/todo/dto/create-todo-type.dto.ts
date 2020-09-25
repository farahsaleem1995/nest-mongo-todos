import { IsNotEmpty, IsString } from 'class-validator';
import { morphism } from 'morphism';

import { ITodoType } from '../models';
import { ISchemaProperty } from '../../shared/interfaces';
import { createTodoTypeSchema } from '../morphism';

export class CreateTodoTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  properties: ISchemaProperty[];

  static toModel(createTodoTypeDto: CreateTodoTypeDto): ITodoType {
    return morphism(createTodoTypeSchema, createTodoTypeDto);
  }
}
