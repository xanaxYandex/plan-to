import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnInit, HostBinding} from '@angular/core';
import {IFilmingRecord} from '@plan-to-lib';


@Component({
  selector: 'plan-to-record-item',
  templateUrl: './record-item.component.html',
  styleUrls: ['./record-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordItemComponent implements OnInit {
  @Input() record!: IFilmingRecord;
  @Output() remove = new EventEmitter<string>();

  @HostBinding('class') hostClass = '';

  public ngOnInit(): void {
    this.isToday(new Date(this.record.date)) && (this.hostClass = 'today');
  }

  private isToday(date: Date) {
    return new Date().toDateString() === date.toDateString();
  }
}
