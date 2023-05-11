import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RecordsStateService} from '../../../../services/records-state.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {CreateFilmingRecordDto, FilmingType} from '@plan-to-lib';
import {ActivatedRoute, Router} from '@angular/router';
import { ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'plan-to-record-editor',
  templateUrl: './record-editor.component.html',
  styleUrls: ['./record-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordEditorComponent implements OnInit {
  private id = '';

  public filmingTypes: FilmingType[] = ['personal', 'beatyMaster', 'reels', 'video', 'blogContent', 'outside', 'institution', 'brand'];
  public separatorKeysCodes: number[] = [ENTER];
  public form = this.builder.nonNullable.group({
    title: ['', [Validators.required]],
    customer: ['', [Validators.required]],
    type: new FormControl<Array<FilmingType>>([], {nonNullable: true}),
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

  constructor(private state: RecordsStateService,
              private route: ActivatedRoute,
              private router: Router,
              private builder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      const record = this.state.selectedItemSource$.getValue();
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
