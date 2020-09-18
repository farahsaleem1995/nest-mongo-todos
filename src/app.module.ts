import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-todos', {
      useFindAndModify: false,
    }),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}