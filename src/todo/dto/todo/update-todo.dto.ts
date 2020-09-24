import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { morphism } from 'morphism';
import { ITodo } from 'src/todo/models';

import { TodoStatus } from '../../constants';
import { ITodoType } from '../../interfaces';
import { updateTodoSchema } from '../../morphism';

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(16)
  title?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(128)
  description?: string;

  @IsNotEmpty()
  @IsEnum(TodoStatus, {
    message: `value must be in "[${TodoStatus.TODO}, ${TodoStatus.DOING}, ${TodoStatus.DONE}]"`,
    always: true,
  })
  status?: string;

  @IsOptional()
  type?: ITodoType;

  static toModel(updateTodoDto: UpdateTodoDto): ITodo {
    return morphism(updateTodoSchema, updateTodoDto);
  }
}
