import {
  IsNotEmpty,
  IsObject,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TodoStatus } from '../../constants';

import { ITodoType } from '../../interfaces';

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

  static toModel(createTodoDto: CreateTodoDto): any {
    const { title, description, type } = createTodoDto;
    const { typeId, properties } = type;

    return {
      title: title,
      description: description,
      status: TodoStatus.TODO,
      type: typeId,
      properties: properties,
    };
  }
}
