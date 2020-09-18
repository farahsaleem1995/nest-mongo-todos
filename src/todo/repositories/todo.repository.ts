import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTodoDto, UpdateTodoDto } from '../dto';
import { Todo } from '../models';
import { TodoStatus } from '../constants';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectModel(Todo.name)
    private readonly todoModel: Model<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoModel
      .find()
      .sort({ _id: -1 })
      .exec();
  }

  find(id: string): Promise<Todo> {
    return this.todoModel.findById({ _id: id }).exec();
  }

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel({
      ...createTodoDto,
      status: TodoStatus.TODO,
    });

    return createdTodo.save();
  }

  update(id: string, updateTodoDto: UpdateTodoDto): Promise<any> {
    return this.todoModel
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            description: updateTodoDto.description,
            status: updateTodoDto.status,
          },
        },
        { new: true, rawResult: true },
      )
      .exec();
  }

  delete(id: string): Promise<any> {
    return this.todoModel.deleteOne({ _id: id }).exec();
  }
}
