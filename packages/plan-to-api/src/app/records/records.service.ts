import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateFilmingRecordDto, IFilmingRecord, UpdateFilmingRecordDto} from '@plan-to-lib';

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel('Record') private readonly model: Model<IFilmingRecord>
  ) {
  }

  public async getAll(userId: string) {
    const records = await this.model.find({creator: userId}).exec();
    console.log(records[0].date, typeof records[0].date, records[0].date instanceof Date)
    return records;
  }

  public async getById(id: string) {
    return await this.model.findById(id).exec();
  }

  public async create(userId: string, payload: CreateFilmingRecordDto) {
    return await new this.model({...payload, creator: userId}).save();
  }

  public async updateById(id: string, payload: UpdateFilmingRecordDto) {
    return await this.model.findByIdAndUpdate(id, payload, {new: true}).exec();
  }

  public async deleteById(id: string) {
    await this.model.findByIdAndDelete(id).exec()
    return id;
  }
}
