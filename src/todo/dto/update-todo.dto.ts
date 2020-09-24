import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { TodoStatus } from '../constants';
import { ITodoType } from '../interfaces';

export class UpdateTodoDto {
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
  @IsEnum(TodoStatus, {
    message: `value must be in "[${TodoStatus.TODO}, ${TodoStatus.DOING}, ${TodoStatus.DONE}]"`,
    always: true,
  })
  status: string;

  @IsOptional()
  type: ITodoType;

  static toModel(updateTodoDto: UpdateTodoDto): any {
    const model: any = {};

    if (updateTodoDto.title) {
      model.title = updateTodoDto.title;
    }
    if (updateTodoDto.description) {
      model.description = updateTodoDto.description;
    }
    if (updateTodoDto.status) {
      model.status = updateTodoDto.status;
    }
    if (updateTodoDto.type) {
      model.type = updateTodoDto.type.typeId;
      model.properties = updateTodoDto.type.properties;
    }

    return model;
  }
}
