import {Body, Controller, Delete, Get, Logger, Param, Patch, Post, Request, UseGuards} from '@nestjs/common';
import {CreateFilmingRecordDto, IFilmingRecord, UpdateFilmingRecordDto} from '@plan-to-lib';
import {RecordsService} from './records.service';
import {JwtAuthGuard} from '../guards/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('records')
export class RecordsController {
  constructor(private recordService: RecordsService) {
  }

  @Get()
  getAllRecords(@Request() {user}) {
    return this.recordService.getAll(user.sub);
  }

  @Get(':id')
  getRecord(@Param('id') id: string) {
    return this.recordService.getById(id);
  }

  @Post()
  createRecord(@Request() {user}, @Body() record: CreateFilmingRecordDto) {
    return this.recordService.create(user.sub, record);
  }

  @Patch(':id')
  updateRecord(@Param('id') id: string,
               @Body() record: UpdateFilmingRecordDto) {
    return this.recordService.updateById(id, record);
  }

  @Delete(':id')
  deleteRecord(@Param('id') id: string) {
    return this.recordService.deleteById(id);
  }
}
