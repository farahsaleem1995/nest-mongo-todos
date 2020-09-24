import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { morphism } from 'morphism';

import { ITodoType } from '../../interfaces';
import { ITodo } from '../../models';
import { createTodoSchema } from '../../morphism';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(16)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(128)
  description: string;

  @IsNotEmpty()
  type: ITodoType;

  static toModel(createTodoDto: CreateTodoDto): ITodo {
    return morphism(createTodoSchema, createTodoDto);
  }
}
