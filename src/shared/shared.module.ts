import { Module } from '@nestjs/common';

import { providers } from './utils';

@Module({
  providers: providers,
})
export class SharedModule {}
