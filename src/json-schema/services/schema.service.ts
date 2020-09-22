import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as Ajv from 'ajv';

import {
  CreateSchemaDto,
  SchemaDto,
  SchemaPropDto,
  ValidateSchemaDto,
} from '../dto';
import { SchemaModel } from '../interfaces';
import { ApplicationSchema } from '../models';
import { SchemaRepository } from '../repositories/SchemaRepository';

@Injectable()
export class SchemaService {
  constructor(private readonly schemaRepository: SchemaRepository) {}

  async create(createSchemaDto: CreateSchemaDto): Promise<SchemaDto> {
    const schema: {
      name: string;
      schemaModel: SchemaModel;
    } = {
      name: createSchemaDto.name,
      schemaModel: this.buildSchema({
        properties: createSchemaDto.properties,
        required: createSchemaDto.required,
      }),
    };

    const createdSchema = await this.schemaRepository.create(schema);

    return SchemaDto.fromModel(createdSchema);
  }

  async validate(validateSchemaDto: ValidateSchemaDto): Promise<SchemaDto> {
    const schema: ApplicationSchema = await this.schemaRepository.findByName(
      validateSchemaDto.name,
    );

    if (!schema) {
      throw new NotFoundException(
        `Schema with name "${validateSchemaDto.name}" does not exist`,
      );
    }

    if (!this.validateObj(schema, validateSchemaDto.properties)) {
      throw new BadRequestException('The provided schema is not valid');
    }

    return schema ? SchemaDto.fromModel(schema) : null;
  }

  private buildSchema(obj: {
    properties: SchemaPropDto[];
    required: string[];
  }): SchemaModel {
    const schemaProperties = obj.properties.reduce(
      (accumulator: any, currentValue: SchemaPropDto): any => {
        const propName: string = currentValue.propName;
        const propType: string = currentValue.propType;

        const jsonString: any = JSON.parse(
          `{"${propName}":{"type":"${propType}"}}`,
        );

        accumulator[propName] = jsonString[propName];

        return accumulator;
      },
      {},
    );

    return {
      type: 'object',
      properties: schemaProperties,
      required: obj.required,
    };
  }

  private validateObj(
    schema: ApplicationSchema,
    obj: any,
  ): boolean | PromiseLike<any> {
    const ajv = new Ajv();
    const validate: Ajv.ValidateFunction = ajv.compile(schema.schemaModel);
    const valid: boolean | PromiseLike<any> = validate(obj);

    return valid;
  }
}
