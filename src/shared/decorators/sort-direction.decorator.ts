import { applyDecorators } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsIn, IsOptional, IsString } from 'class-validator';

export function SortDiraction() {
  return applyDecorators(
    IsOptional(),
    IsString(),
    IsIn(['1', '0']),
    Expose({ name: 'isDescending' }),
  );
}
