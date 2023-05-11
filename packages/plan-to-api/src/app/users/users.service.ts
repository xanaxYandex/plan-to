import {BadRequestException, Injectable, NotAcceptableException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateUserDto, UpdateUserDto} from '@plan-to-lib';
import {IUser} from '@plan-to-lib';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly model: Model<IUser>,
  ) {
  }

  public async getAll() {
    return await this.model.find().exec();
  }

  public async getByEmail(email) {
    return await this.model.findOne({email}).lean().exec();
  }

  public async getById(id: string) {
    return await this.model.findById(id).exec();
  }

  public async create(payload: CreateUserDto) {
    payload.password = await bcrypt.hash(payload.password, 5);
    return await new this.model(payload).save();
  }

  public async updateById(id: string, payload: UpdateUserDto) {
    return await this.model.findByIdAndUpdate(id, payload, {new: true}).exec();
  }

  public async getAllWithRecords() {
    return await this.model.aggregate([
      {
        $lookup : {
          from : 'Records',
          localField : '_id',
          foreignField : 'creator',
          as : 'records'
        }
      }
    ]).exec();
  }
  //
  // public async deleteById(id: string) {
  //   await this.model.findByIdAndDelete(id).exec()
  //   return id;
  // }
}
