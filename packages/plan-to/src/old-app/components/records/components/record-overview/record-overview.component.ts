import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RecordsStateService} from '../../../../services/records-state.service';
import {BehaviorSubject} from 'rxjs';
import {IFilmingRecord} from '@plan-to-lib';


@Component({
  selector: 'plan-to-record-overview',
  templateUrl: './record-overview.component.html',
  styleUrls: ['./record-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordOverviewComponent implements OnInit{

  public record$: BehaviorSubject<IFilmingRecord | null> = this.state.selectedItemSource$;

  constructor(private state: RecordsStateService,
              private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if(id && this.record$?.value?._id !== id) {
      this.state.getRecord(id);
    }
  }

}
