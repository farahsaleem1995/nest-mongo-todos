import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TodoStatus } from '../constants';

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
}
