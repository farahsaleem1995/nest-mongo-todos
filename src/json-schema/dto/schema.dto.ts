import { ApplicationSchema } from '../models';

export class SchemaDto {
  name: string;

  properties: any[];

  required: string[];

  static fromModel(schema: ApplicationSchema): SchemaDto {
    const { name, schemaModel } = schema;

    const schemaDto: SchemaDto = {
      name: name,
      properties: schemaModel.properties,
      required: schemaModel.required,
    };

    return schemaDto;
  }
}
