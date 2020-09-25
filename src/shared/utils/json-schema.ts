import * as Ajv from 'ajv';

import { ISchemaModel, ISchemaProperty } from '../interfaces';

export const buildSchema = (obj: {
  properties: ISchemaProperty[];
}): ISchemaModel => {
  const typeProperties = obj.properties.reduce(
    (accumulator: any, currentValue: ISchemaProperty): any => {
      const propName: string = currentValue.name;
      const propType: string = currentValue.type;
      const items: any = currentValue.items
        ? JSON.stringify(buildSchema({ properties: currentValue.items }))
        : null;

      const jsonString: any = items
        ? JSON.parse(`{"${propName}":{"type":"${propType}","item":${items}}}`)
        : JSON.parse(`{"${propName}":{"type":"${propType}"}}`);

      accumulator[propName] = jsonString[propName];

      return accumulator;
    },
    {},
  );
  const requiredProperties: string[] = obj.properties
    .filter(prop => prop.isRequired)
    .map(prop => prop.name);

  return {
    type: 'object',
    properties: typeProperties,
    required: requiredProperties,
  };
};

export const validateType = async (
  obj: any,
  typeModel: ISchemaModel,
): Promise<boolean> => {
  const ajv = new Ajv();
  const validate = ajv.compile(typeModel);
  const valid = validate(obj);

  return !valid ? false : true;
};
