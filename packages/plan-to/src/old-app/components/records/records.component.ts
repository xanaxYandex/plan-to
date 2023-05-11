import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {IFilmingRecord} from '@plan-to-lib';
import {RecordsStateService} from '../../services/records-state.service';

@Component({
  selector: 'plan-to-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordsComponent {
  public textFilterValue$: Observable<string> = this.state.textFilter$.asObservable();
  public records$: Observable<IFilmingRecord[]> = this.state.records$;
  public loading$: Observable<boolean> = this.state.loadingList$;

  @HostBinding('class') hostClass = this.route.children.length ? 'expanded' : '';

  constructor(private state: RecordsStateService,
              private route: ActivatedRoute) {
  }

  public applyHostClass(className: string): void {
    this.hostClass = className;
  }

  public selectItem(record: IFilmingRecord): void {
    this.state.selectedRecord = record;
  }

  public removeItem(id: string): void {
    this.state.deleteRecord(id);
  }

  public setTextFilterValue(text: string): void {
    this.state.textFilter = text;
  }

}
