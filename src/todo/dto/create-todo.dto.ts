import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  properties: any;
}
