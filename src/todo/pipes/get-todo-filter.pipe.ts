import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { GetTodosFilterDto } from '../dto';

@Injectable()
export class GetTodoFilterPipe
  implements PipeTransform<GetTodosFilterDto, Promise<GetTodosFilterDto>> {
  async transform(
    value: GetTodosFilterDto,
    metadata: ArgumentMetadata,
  ): Promise<GetTodosFilterDto> {
    value = plainToClass(GetTodosFilterDto, value);

    const validationError = await validate(value, {
      whitelist: true,
    });

    if (validationError.length > 0) {
      throw new BadRequestException();
    }

    return value;
  }
}
