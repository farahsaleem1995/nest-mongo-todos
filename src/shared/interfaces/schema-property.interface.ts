import { SchemaProperties } from '../constants';

export interface ISchemaProperty {
  name: string;

  type: SchemaProperties;

  isRequired: boolean;

  items?: ISchemaProperty[];
}
