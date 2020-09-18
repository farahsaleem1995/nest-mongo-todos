import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from 'src/shared/models';

import { TodoStatus } from '../constants';

@Schema({ timestamps: true })
export class Todo extends BaseModel {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({
    type: String,
    required: true,
    enum: [TodoStatus.TODO, TodoStatus.DOING, TodoStatus.DOING],
  })
  status: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
