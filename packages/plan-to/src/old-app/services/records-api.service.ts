import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of, tap} from 'rxjs';
import {
  CreateFilmingRecordDto,
  IFilmingRecord,
  UpdateFilmingRecordDto,
} from '@plan-to-lib';
import { ENV } from '../../main';

const mockRecords: IFilmingRecord[] = [
  {
    _id: '6401ed9378b28f30d3f19a06',
    additionalInfo: 'Additional info test 1',
    customer: 'Степановна',
    date: new Date('2023-03-03T12:48:08.000+00:00').toISOString(),
    deadline: new Date('2023-03-05T12:48:08.000+00:00').toISOString(),
    duration: 2,
    location: {
      address: 'Test St., 12',
      mapUrl: 'https://goo.gl/maps/Fmr9Lb4MdP89aThz8',
    },
    props: [],
    reference: 'https://www.pinterest.com/zinevichkaj/idea-content/',
    title: 'TEST TITLE 1',
    type: ['reels', 'brand'],
  },
  {
    _id: '6401ed9378b28f30d36ha06',
    additionalInfo: 'Additional info test 1',
    customer: 'Аля',
    date: new Date('2023-03-01T12:30:08.000+00:00').toISOString(),
    deadline: new Date('2023-03-08T17:30:08.000+00:00').toISOString(),
    duration: 4,
    location: {
      address: 'Test St., 54',
      mapUrl: 'https://goo.gl/maps/Fmr9Lb4MdP89aThz8',
    },
    props: [],
    reference: 'https://www.pinterest.com/zinevichkaj/idea-content/',
    title: 'TEST TITLE 2',
    type: ['beatyMaster', 'blogContent'],
  },
];

@Injectable()
export class RecordsApiService {
  private readonly http = inject(HttpClient);
  private readonly env = inject(ENV);
  private readonly urlWithPrefix = `${this.env.api}/records`;

  public getAll(): Observable<IFilmingRecord[]> {
    // return of([...mockRecords]);
    return this.http.get<IFilmingRecord[]>(`${this.urlWithPrefix}`);
  }

  public getById(id: string): Observable<IFilmingRecord> {
    // return of(mockRecords.find(item => item._id === id) ?? mockRecords[0]);
    return this.http.get<IFilmingRecord>(`${this.urlWithPrefix}/${id}`);
  }

  public create(record: CreateFilmingRecordDto): Observable<IFilmingRecord> {
    // return of({_id: (Math.random() * 4576).toString(), ...record});
    return this.http.post<IFilmingRecord>(`${this.urlWithPrefix}`, record);
  }

  public updateById(
    id: string,
    record: UpdateFilmingRecordDto
  ): Observable<IFilmingRecord> {
    // return of({_id: id, ...record as CreateFilmingRecordDto});
    return this.http.patch<IFilmingRecord>(`${this.urlWithPrefix}/${id}`, record);
  }

  public deleteById(id: string): Observable<string> {
    // return of(id);
    return this.http.delete<string>(`${this.urlWithPrefix}/${id}`);
  }
}
