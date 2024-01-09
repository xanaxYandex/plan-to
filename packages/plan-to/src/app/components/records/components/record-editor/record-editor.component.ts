import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RecordsStateService} from '../../../../services/records-state.service';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {CreateFilmingRecordDto, FilmingType} from '@plan-to-lib';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {RecordsSignalStateService} from "../../../../services/records-signal-state.service";

@Component({
  selector: 'plan-to-record-editor',
  standalone: true,
  templateUrl: './record-editor.component.html',
  styleUrls: ['./record-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatSelectModule,
    NgForOf,
    MatChipsModule,
    MatIconModule,
    AsyncPipe,
    MatButtonModule
  ]
})
export class RecordEditorComponent implements OnInit {
  private readonly state = inject(RecordsSignalStateService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly builder = inject(FormBuilder);
  private id = '';

  public filmingTypes: FilmingType[] = ['personal', 'beatyMaster', 'reels', 'video', 'blogContent', 'outside', 'institution', 'brand'];
  public separatorKeysCodes: number[] = [ENTER];
  public form = this.builder.nonNullable.group({
    title: ['', [Validators.required]],
    customer: ['', [Validators.required]],
    type: new FormControl<FilmingType[]>([], {nonNullable: true}),
    date: this.builder.nonNullable.control<Date | string>(new Date(), {validators: [Validators.required]}),
    duration: 0,
    deadline: this.builder.nonNullable.control<Date | string>(new Date(), {validators: [Validators.required]}),
    location: this.builder.nonNullable.group({
      mapUrl: '',
      address: ['', [Validators.required]]
    }),
    reference: '',
    props: new FormControl<Array<string>>([], {nonNullable: true}),
    additionalInfo: ''
  });

  public ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    const record  = this.state.selectedRecord();
    if (this.id) {
      record && this.setForm(record);
    }
  }

  public setForm(value: CreateFilmingRecordDto): void {
    const date = new Date(value.date).toISOString();
    const deadline = new Date(value.deadline).toISOString();
    this.form.patchValue({
      ...value,
      date: date.substring(0, date.indexOf("T") + 6),
      deadline: deadline.substring(0, deadline.indexOf("T") + 6)
    });
  }

  public addProp(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const prevValue = this.form.controls.props.value;
    this.form.controls.props.setValue([...prevValue, value]);
  }

  public removeProp(prop: string): void {
    const prevValue = this.form.controls.props.value;
    this.form.controls.props.setValue(prevValue.filter((i) => i !== prop));
  }

  public submit(): void {
    if (this.id) {
      this.state.updateRecord(this.id, this.form.getRawValue());
    } else {
      this.state.createRecord(this.form.getRawValue());
    }
    this.router.navigate(['..'], {relativeTo: this.route});
  }
}
