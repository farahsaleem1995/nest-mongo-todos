import { applyDecorators } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export function SortKey(keys?: string[]) {
  if (!keys) {
    return applyDecorators(
      IsOptional(),
      IsNotEmpty(),
      IsString(),
      Expose({ name: 'sortBy' }),
    );
  }

  return applyDecorators(
    IsOptional(),
    IsNotEmpty(),
    IsString(),
    IsIn(keys),
    Expose({ name: 'sortBy' }),
  );
}
