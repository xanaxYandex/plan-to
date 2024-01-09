import {ChangeDetectionStrategy, Component, HostBinding, inject} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {RecordItemComponent} from './components/record-item/record-item.component';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
import {Observable} from 'rxjs';
import {IFilmingRecord} from '@plan-to-lib';
import {RecordsStateService} from '../../services/records-state.service';
import {LoadingIndicatorComponent} from '../../shared/components/loading-indicator/loading-indicator.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {RecordsSignalStateService} from "../../services/records-signal-state.service";

@Component({
  selector: 'plan-to-records',
  standalone: true,
  imports: [RecordItemComponent,
    RouterOutlet,
    LoadingIndicatorComponent,
    NgIf,
    NgForOf,
    AsyncPipe,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordsComponent {
  private readonly state = inject(RecordsSignalStateService);
  private readonly route = inject(ActivatedRoute);

  public textFilterValue= this.state.textFilter;

  public records = this.state.records;
  public loading= this.state.loading;

  @HostBinding('class') hostClass = this.route.children.length ? 'expanded' : '';

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
