import { IsIn, IsNotEmpty, IsString } from 'class-validator';

import { SchemaType } from '../constants';

export class SchemaPropDto {
  @IsString()
  @IsNotEmpty()
  propName: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([SchemaType.BOOLEAN, SchemaType.NUMBER, SchemaType.STRING])
  propType: string;
}
