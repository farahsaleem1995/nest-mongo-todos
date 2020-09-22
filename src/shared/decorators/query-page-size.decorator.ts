import { applyDecorators } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export function QueryPageSize() {
  return applyDecorators(IsOptional(), IsInt(), Expose({ name: 'pageSize' }));
}
