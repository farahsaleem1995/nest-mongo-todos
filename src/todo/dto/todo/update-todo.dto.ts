import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { TodoStatus } from '../../constants';
import { ITodoType } from '../../interfaces';

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
    const { title, status, description, type } = updateTodoDto;

    model.title = title;
    model.description = description;
    model.status = status;
    model.type = type ? type.typeId : undefined;
    model.properties = type ? type.properties : undefined;

    return model;
  }
}
