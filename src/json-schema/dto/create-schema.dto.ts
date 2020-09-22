import { IsNotEmpty, IsString } from 'class-validator';

import { SchemaPropDto } from './schema-prop.dto';

export class CreateSchemaDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  properties: SchemaPropDto[];

  @IsNotEmpty()
  required: string[];
}
