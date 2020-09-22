import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BaseModel } from 'src/shared/models';

import { TodoStatus } from '../constants';
import { TodoType } from './todo-type.model';

@Schema({ timestamps: true })
export class Todo extends BaseModel {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: TodoType.name,
  })
  type: TodoType;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({
    type: String,
    required: true,
    enum: [TodoStatus.TODO, TodoStatus.DOING, TodoStatus.DOING],
  })
  status: string;

  @Prop({ type: Object, required: true })
  properties: any;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
