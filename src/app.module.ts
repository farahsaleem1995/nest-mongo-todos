import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodoModule } from './todo/todo.module';
import { SharedModule } from './shared/shared.module';
import { JsonSchemaModule } from './json-schema/json-schema.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-todos', {
      useFindAndModify: false,
    }),
    TodoModule,
    SharedModule,
    JsonSchemaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
