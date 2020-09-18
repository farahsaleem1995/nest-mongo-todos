import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { TodoStatus } from '../constants';

@Schema({ timestamps: true })
export class Todo extends Document {
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

  @Prop({ type: Date })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
