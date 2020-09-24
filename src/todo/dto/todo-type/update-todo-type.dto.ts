import { IsOptional, IsString } from 'class-validator';
import { morphism } from 'morphism';

import { ITodoType } from '../../models';
import { ITodoTypeProperty } from '../../interfaces';
import { updateTodoTypeSchema } from '../../morphism';

export class UpdateTodoTypeDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  properties: ITodoTypeProperty[];

  static toModel(updateTodoTypeDto: UpdateTodoTypeDto): ITodoType {
    return morphism(updateTodoTypeSchema, updateTodoTypeDto);
  }
}
