import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { GetTodosQueryDto } from '../dto';

@Injectable()
export class GetTodosQueryPipe
  implements PipeTransform<GetTodosQueryDto, Promise<GetTodosQueryDto>> {
  async transform(value: GetTodosQueryDto): Promise<GetTodosQueryDto> {
    value = plainToClass(GetTodosQueryDto, value);

    const validationError = await validate(value, {
      whitelist: true,
    });

    if (validationError.length > 0) {
      throw new BadRequestException();
    }

    return value;
  }
}
