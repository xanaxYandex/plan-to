import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsRoutingModule } from './records-routing.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {RecordsComponent} from './records.component';
import {RecordEditorComponent} from './components/record-editor/record-editor.component';
import {RecordItemComponent} from './components/record-item/record-item.component';
import {RecordOverviewComponent} from './components/record-overview/record-overview.component';
import {LoadingIndicatorComponent} from '../../shared/components/loading-indicator/loading-indicator.component';
import {MatSelectModule} from '@angular/material/select';
import {RouterModule} from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {RecordsApiService} from '../../services/records-api.service';
import {RecordsStateService} from '../../services/records-state.service';


@NgModule({
  declarations: [RecordsComponent, RecordEditorComponent, RecordItemComponent, RecordOverviewComponent, LoadingIndicatorComponent],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    RouterModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule
  ],
  providers: [
    RecordsApiService,
    RecordsStateService
  ]
})
export class RecordsModule { }
