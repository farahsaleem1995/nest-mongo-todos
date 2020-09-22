import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseModel } from '../../shared/models';
import { SchemaModel } from '../interfaces';

@Schema({ timestamps: true })
export class ApplicationSchema extends BaseModel {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Object, required: true })
  schemaModel: SchemaModel;
}

export const ApplicationSchemaSchema = SchemaFactory.createForClass(
  ApplicationSchema,
);
