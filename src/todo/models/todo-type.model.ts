import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ISchemaModel } from '../../shared/interfaces';
import { BaseModel } from '../../shared/models';

@Schema({ timestamps: true })
export class TodoType extends BaseModel implements ITodoType {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: Object, required: true })
  typeModel: ISchemaModel;
}

export const TodoTypeSchema = SchemaFactory.createForClass(TodoType);

export interface ITodoType {
  name: string;

  typeModel: ISchemaModel;
}
