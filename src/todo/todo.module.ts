import { Module } from '@nestjs/common';

import { controllers, imports, providers } from './utils';

@Module({
  imports: imports,
  controllers: controllers,
  providers: providers,
})
export class TodoModule {}
