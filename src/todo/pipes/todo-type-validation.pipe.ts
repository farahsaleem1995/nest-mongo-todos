import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from '../dto';

export class TodoTypeValidtionPipe
  implements
    PipeTransform<
      CreateTodoDto | UpdateTodoDto,
      CreateTodoDto | UpdateTodoDto
    > {
  transform(
    value: CreateTodoDto | UpdateTodoDto,
    metadata: ArgumentMetadata,
  ): CreateTodoDto | UpdateTodoDto {
    const { type } = value;
    const message: string[] = [];

    if (type) {
      if (!type.typeId) {
        message.push('type typeId should not be empty');
      }
      if (!type.properties) {
        message.push('type properties should not be empty');
      }
    }

    if (message.length > 0) {
      throw new BadRequestException(message);
    }

    return value;
  }
}
