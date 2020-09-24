import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BaseModel } from '../../shared/models';
import { ITodoTypeModel } from '../interfaces/todo-type-model.interface';

@Schema({ timestamps: true })
export class TodoType extends BaseModel implements ITodoType {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: Object, required: true })
  typeModel: ITodoTypeModel;
}

export const TodoTypeSchema = SchemaFactory.createForClass(TodoType);

export interface ITodoType {
  name: string;

  typeModel: ITodoTypeModel;
}
