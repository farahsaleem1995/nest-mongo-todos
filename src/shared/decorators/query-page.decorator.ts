import { applyDecorators } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export function QueryPage() {
  return applyDecorators(IsOptional(), IsInt(), Expose({ name: 'page' }));
}
