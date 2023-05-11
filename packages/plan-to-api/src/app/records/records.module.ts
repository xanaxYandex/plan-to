import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {FilmingRecordSchema} from './record.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Record', schema: FilmingRecordSchema}
    ])
  ],
  providers: [RecordsService],
  controllers: [RecordsController],
})
export class RecordsModule {}
