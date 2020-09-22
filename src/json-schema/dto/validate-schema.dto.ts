import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateSchemaDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  properties: any;
}
