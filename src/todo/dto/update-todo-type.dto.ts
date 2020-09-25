import { IsOptional, IsString } from 'class-validator';
import { morphism } from 'morphism';

import { ITodoType } from '../models';
import { ISchemaProperty } from '../../shared/interfaces';
import { updateTodoTypeSchema } from '../morphism';

export class UpdateTodoTypeDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  properties: ISchemaProperty[];

  static toModel(updateTodoTypeDto: UpdateTodoTypeDto): ITodoType {
    return morphism(updateTodoTypeSchema, updateTodoTypeDto);
  }
}
