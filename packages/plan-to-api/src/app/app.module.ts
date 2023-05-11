import { Module } from '@nestjs/common';
import { RecordsModule } from './records/records.module';
import {MongooseModule} from '@nestjs/mongoose';
import {ScheduleModule} from '@nestjs/schedule';
import {TasksModule} from './tasks/tasks.module';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import { TokenModule } from './token/token.module';



@Module({
  imports: [
    RecordsModule,
    MongooseModule.forRoot('mongodb+srv://coolsasha1313:s1a3n1y0a@cluster0.zmeopej.mongodb.net/?retryWrites=true&w=majority'),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    TokenModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
