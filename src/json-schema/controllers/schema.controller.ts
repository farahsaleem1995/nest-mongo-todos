import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { SchemaService } from '../services';
import { CreateSchemaDto, SchemaDto, ValidateSchemaDto } from '../dto';

@Controller('schema')
export class SchemaController {
  constructor(private readonly schemaService: SchemaService) {}

  @Post('')
  @HttpCode(201)
  creaet(
    @Body(ValidationPipe) createSchemaDto: CreateSchemaDto,
  ): Promise<SchemaDto> {
    return this.schemaService.create(createSchemaDto);
  }

  @Post('validate')
  @HttpCode(201)
  validate(
    @Body(ValidationPipe) validateSchemaDto: ValidateSchemaDto,
  ): Promise<SchemaDto> {
    return this.schemaService.validate(validateSchemaDto);
  }
}
