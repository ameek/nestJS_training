import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IDataServices } from '../../../core';
import { DATA_BASE_CONFIGURATION } from '../../../configuration';
import {
  Author,
  AuthorSchema,
  Book,
  BookSchema,
  Genre,
  GenreSchema,
} from './model';
import { MongoDataServices } from './mongo-data-services.service';

// const CLEAN_NEST_MONGO_CONNECTION_STRING = 'mongodb://root:Root%401234@localhost:27017/?authSource=clean_node';
const CLEAN_NEST_MONGO_CONNECTION_STRING = 'mongodb://root:Root%401234@localhost:27017/';

//  const CLEAN_NEST_MONGO_CONNECTION_STRING = 'mongodb://localhost:27017/clean_node';


 @Module({
  imports: [
    MongooseModule.forFeature([
      { name: Author.name, schema: AuthorSchema },
      { name: Book.name, schema: BookSchema },
      { name: Genre.name, schema: GenreSchema },
    ]),
    MongooseModule.forRoot(DATA_BASE_CONFIGURATION.mongoConnectionString),
    // MongooseModule.forRoot(CLEAN_NEST_MONGO_CONNECTION_STRING),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}
