import { Module } from '@nestjs/common';

import { BaseRepository } from './repositories';

@Module({
  providers: [BaseRepository],
})
export class SharedModule {}
