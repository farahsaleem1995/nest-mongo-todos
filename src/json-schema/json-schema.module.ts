import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SchemaController } from './controllers';
import { ApplicationSchema, ApplicationSchemaSchema } from './models';
import { SchemaRepository } from './repositories/SchemaRepository';
import { SchemaService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ApplicationSchema.name,
        schema: ApplicationSchemaSchema,
        collection: 'schemas',
      },
    ]),
  ],
  controllers: [SchemaController],
  providers: [SchemaService, SchemaRepository],
})
export class JsonSchemaModule {}
