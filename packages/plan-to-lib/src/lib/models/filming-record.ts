import {ILocation} from './location';

export type FilmingType =
  'personal' |
  'beatyMaster' |
  'reels' |
  'video' |
  'blogContent' |
  'outside' |
  'institution' |
  'brand';

export interface IFilmingRecord {
  _id: string;
  title: string;
  location: ILocation;
  date: Date | string;
  customer: string;
  type: FilmingType[];
  props: string[];
  reference: string;
  duration: number;
  deadline: Date | string;
  additionalInfo: string;
}

export type CreateFilmingRecordDto = Omit<IFilmingRecord, '_id'>;
export type UpdateFilmingRecordDto = Partial<IFilmingRecord>;
