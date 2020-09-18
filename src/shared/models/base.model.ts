import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class BaseModel extends Document {
  @Prop({ type: Date })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;
}
