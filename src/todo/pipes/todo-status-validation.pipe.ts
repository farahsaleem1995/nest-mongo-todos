import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { TodoStatus } from '../constants';

@Injectable()
export class TodoStatusValidationPipe implements PipeTransform<string, string> {
  private readonly allowedStatuses = [
    TodoStatus.TODO,
    TodoStatus.DOING,
    TodoStatus.DONE,
  ];

  transform(value: string): string {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is not a valid todo status`);
    }

    return value;
  }

  private isStatusValid(value: any): boolean {
    const index = this.allowedStatuses.indexOf(value);
    return index !== -1;
  }
}
