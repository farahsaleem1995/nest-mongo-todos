import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodoModule } from './todo/todo.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-todos', {
      useFindAndModify: false,
    }),
    TodoModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
