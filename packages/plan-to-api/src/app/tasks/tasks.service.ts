import {Injectable} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import {RecordsService} from '../records/records.service';
import {UsersService} from '../users/users.service';


@Injectable()
export class TasksService {
  private readonly THREE_HOURS = 180 * 60 * 1000;
  private readonly VAPID_KEYS = {
    publicKey: 'BCh6M1BtHyLVPg4GYAfMJBFTIkcjz28qsOo8UiX4F6BAxDeqZKIRzJX9KHC3HOfj5R09m-YV09Xvt19IdctdCHc',
    privateKey: 'jZ9eV9dXfGDK7J6QLvkp4vUYnjzg1Wy7PkXHksoGJnY'
  };

  constructor(private recordsService: RecordsService, private readonly usersService: UsersService) {
  }

  @Cron('0 30 9-20 ? * * *')
  private async sendNotification(): Promise<void> {
    const users = await this.usersService.getAllWithRecords();


    await Promise.all(users.map(async (user) => {
      const now = Date.now();

      user.records.forEach((item) => {
        const recordDate = item.date instanceof Date ? item.date.toISOString() : item.date;
        const startDate = new Date(recordDate.substring(0, recordDate.indexOf('T') + 6)).getTime();
        if (startDate > now && startDate - now < this.THREE_HOURS) {

        }
      })

    }))
  }
}
