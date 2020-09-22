import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from 'src/shared/repositories';
import { ValidateSchemaDto } from '../dto';
import { ApplicationSchema } from '../models';

@Injectable()
export class SchemaRepository extends BaseRepository<ApplicationSchema> {
  constructor(
    @InjectModel(ApplicationSchema.name)
    private readonly schmeaModel: Model<ApplicationSchema>,
  ) {
    super(schmeaModel);
  }

  async findByName(name: string): Promise<ApplicationSchema> {
    return await this.schmeaModel.findOne({ name: name });
  }
}
