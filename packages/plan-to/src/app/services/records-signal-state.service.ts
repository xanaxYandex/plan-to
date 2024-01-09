import {computed, EventEmitter, inject, Injectable, Signal, signal} from '@angular/core';
import {
  asyncScheduler,
  BehaviorSubject,
  combineLatest,
  map, mergeMap,
  Observable,
  observeOn,
  of,
  startWith,
  Subject,
  switchMap, tap
} from 'rxjs';
import {RecordsApiService} from './records-api.service';
import {CreateFilmingRecordDto, FilmingType, IFilmingRecord, UpdateFilmingRecordDto} from '@plan-to-lib';
import {ascendingSort} from '../shared/helpers/sorting';

interface RecordsState {
  records: IFilmingRecord[];
  selectedRecord: IFilmingRecord | null;
  loading: boolean;
}

@Injectable()
export class RecordsSignalStateService {
  private readonly recordsApi = inject(RecordsApiService);

  private state = signal<RecordsState>({
    records: [],
    loading: false,
    selectedRecord: null
  });
  private textFilterSource = signal('');
  private recordsSource = computed(() => this.state().records);

  public loading = computed(() => this.state().loading);
  public records = computed(() => {
    const text = this.textFilterSource();
    const records = this.recordsSource();
    return !text ? records : records.filter((record) =>
      record.title.toLocaleLowerCase().indexOf(text.trim().toLocaleLowerCase()) !== -1 ||
      record.customer.toLocaleLowerCase().indexOf(text.trim().toLocaleLowerCase()) !== -1 ||
      record.type.findIndex((value) =>
        value.toLocaleLowerCase().indexOf(text.trim().toLocaleLowerCase() as FilmingType) !== -1
      ) !== -1
    ).sort(ascendingSort('date'));
  });

  constructor() {
    this.getAll();
  }

  public get textFilter(): Signal<string> {
    return computed(() => this.textFilterSource());
  }

  public set textFilter(value: string) {
    this.textFilterSource.set(value);
  }

  public get selectedRecord(): Signal<IFilmingRecord | null> {
    return computed(() => this.state().selectedRecord);
  }

  public set selectedRecord(record: IFilmingRecord) {
    this.state.update(state => ({...state, selectedRecord: record}));
  }

  public getRecord(id: string): void {
    this.recordsApi.getById(id).subscribe((res) =>
      this.state.update(state => ({...state, selectedRecord: res}))
    );
  }

  public updateRecord(id: string, record: UpdateFilmingRecordDto): void {
    this.recordsApi.updateById(id, record).subscribe((res) =>
      this.state.update(state => ({
        ...state,
        selectedRecord: res,
        records: state.records.map((item) => res._id === item._id ? res : item)
      }))
    );
  }

  public createRecord(record: CreateFilmingRecordDto): void {
    this.recordsApi.create(record).subscribe((res) =>
      this.state.update(state => ({...state, records: [...state.records, res]}))
    );
  }

  public deleteRecord(id: string): void {
    this.recordsApi.deleteById(id).subscribe(() =>
      this.state.update(state => ({
        ...state,
        records: state.records.filter((item) => id !== item._id)
      }))
    );
  }

  public getAll(): void {
    this.state.update((state) => ({...state, loading: true}));
    this.recordsApi.getAll().subscribe((records) => {
      this.state.update(state => ({
        ...state,
        loading: false,
        records
      }))
    });
  }

}
