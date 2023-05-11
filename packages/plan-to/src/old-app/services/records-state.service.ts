import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, switchMap} from 'rxjs';
import {RecordsApiService} from './records-api.service';
import {CreateFilmingRecordDto, FilmingType, IFilmingRecord, UpdateFilmingRecordDto} from '@plan-to-lib';
import {ascendingSort} from '../shared/helpers/sorting';


@Injectable()
export class RecordsStateService {
  private readonly recordsApi = inject(RecordsApiService);

  private recordsState: IFilmingRecord[] = [];
  private recordsSource$ = new BehaviorSubject<IFilmingRecord[]>([]);

  public textFilter$ = new BehaviorSubject<string | FilmingType>('');
  public loadingList$ = new BehaviorSubject<boolean>(false);
  public selectedItemSource$ = new BehaviorSubject<IFilmingRecord | null>(null);

  public records$: Observable<IFilmingRecord[]> = this.textFilter$.pipe(
    switchMap((text) => {
      return this.recordsSource$.pipe(
        map((records) => {
          return records.filter((record) =>
            record.title.toLocaleLowerCase().indexOf(text.trim().toLocaleLowerCase()) !== -1 ||
            record.customer.toLocaleLowerCase().indexOf(text.trim().toLocaleLowerCase()) !== -1 ||
            record.type.findIndex((value) =>
              value.toLocaleLowerCase().indexOf(text.trim().toLocaleLowerCase() as FilmingType) !== -1
            ) !== -1
          ).sort(ascendingSort('date'));
        })
      )
    })
  );

  public set selectedRecord(value: IFilmingRecord | null) {
    this.selectedItemSource$.next(value);
  }

  public set textFilter(value: string) {
    this.textFilter$.next(value);
  }

  constructor() {
    this.getAll();
  }

  public hasRecords(): boolean {
    return !!this.recordsState.length;
  }

  public filterRecords(text: string): void {
    // this.recordsSource$.next(findObjectsByProp(this.recordsState, 'label', text));
  }

  public getRecord(id: string): void {
    this.selectedRecord = null;
    this.recordsApi.getById(id).subscribe((res) => this.selectedRecord = res);
  }

  public updateRecord(id: string, record: UpdateFilmingRecordDto): void {
    this.recordsApi.updateById(id, record).subscribe((res) => {
      this.selectedRecord = res;
      this.recordsState = this.recordsState.map((item) => res._id === item._id ? res : item);
      this.recordsSource$.next(this.recordsState);
    });
  }

  public createRecord(record: CreateFilmingRecordDto): void {
    this.recordsApi.create(record).subscribe((res) => {
      this.recordsState.push(res);
      this.recordsSource$.next(this.recordsState);
    });
  }

  public deleteRecord(id: string): void {
    this.recordsApi.deleteById(id).subscribe(() => {
      this.recordsState = this.recordsState.filter((item) => id !== item._id);
      this.recordsSource$.next(this.recordsState);
    });
  }

  public getAll(): void {
    this.loadingList$.next(true);
    this.recordsApi.getAll().subscribe((tasks) => {
      this.recordsState = tasks;
      this.recordsSource$.next(tasks);
      this.loadingList$.next(false);
    });
  }

}
