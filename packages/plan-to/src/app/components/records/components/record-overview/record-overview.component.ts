import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {RecordsStateService} from '../../../../services/records-state.service';
import {BehaviorSubject} from 'rxjs';
import {IFilmingRecord} from '@plan-to-lib';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {LoadingIndicatorComponent} from '../../../../shared/components/loading-indicator/loading-indicator.component';
import {MatChipsModule} from '@angular/material/chips';
import {RecordsSignalStateService} from "../../../../services/records-signal-state.service";


@Component({
  selector: 'plan-to-record-overview',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf, NgForOf, DatePipe, LoadingIndicatorComponent, MatChipsModule],
  templateUrl: './record-overview.component.html',
  styleUrls: ['./record-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordOverviewComponent implements OnInit{
  private readonly state = inject(RecordsSignalStateService);
  private readonly route = inject(ActivatedRoute);

  public record = this.state.selectedRecord;

  public ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const record  = this.record();
    if(id && (!record || record._id !== id)) {
      this.state.getRecord(id);
    }
  }

}
