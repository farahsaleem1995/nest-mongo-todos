import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { validate } from 'class-validator';

@Injectable()
export class WhitelistValidationPipe<Dto>
  implements PipeTransform<Dto, Promise<Dto>> {
  protected classType: ClassType<Dto>;
  constructor(cls: ClassType<Dto>) {
    this.classType = cls;
  }
  async transform(value: Dto, metadata: ArgumentMetadata): Promise<Dto> {
    value = plainToClass(this.classType, value);

    const validationError = await validate(value, {
      whitelist: true,
    });

    if (validationError.length > 0) {
      throw new BadRequestException();
    }

    return value;
  }
}
