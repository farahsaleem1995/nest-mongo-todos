import { Module } from '@nestjs/common';
import { WhitelistValidationPipe } from './pipes';

import { BaseRepository } from './repositories';

@Module({
  providers: [
    BaseRepository,
    {
      useFactory: (cls: any) => {
        return new WhitelistValidationPipe(cls);
      },
      provide: WhitelistValidationPipe,
    },
  ],
})
export class SharedModule {}
