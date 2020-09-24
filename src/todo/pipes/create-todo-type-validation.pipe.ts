import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateTodoTypeDto } from '../dto';
import { ICreateTodoTypeProperty } from '../interfaces';

@Injectable()
export class CreateTodoTypeValidationPipe
  implements PipeTransform<CreateTodoTypeDto, CreateTodoTypeDto> {
  transform(
    value: CreateTodoTypeDto,
    metadata: ArgumentMetadata,
  ): CreateTodoTypeDto {
    const message: string[] = [];

    value.properties.forEach((property: ICreateTodoTypeProperty) => {
      if (!property.name) {
        message.push('Property name should not be empty');
      }
      if (!property.type) {
        message.push('Property type should not be empty');
      }
    });

    if (message.length > 0) {
      throw new BadRequestException(message);
    }

    return value;
  }
}
