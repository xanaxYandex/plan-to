import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, take} from 'rxjs';
import {RecordsStateService} from '../../services/records-state.service';
import {IFilmingRecord} from '@plan-to-lib';

@Injectable({
  providedIn: 'root'
})
export class SelectedItemResolver implements Resolve<IFilmingRecord | null> {
  constructor(private recordsState: RecordsStateService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFilmingRecord | null > | IFilmingRecord | null {
    const id =  route.params['id'];

    if(this.recordsState.selectedItemSource$.value?._id !== id) {
      this.recordsState.getRecord(id);
      return this.recordsState.selectedItemSource$;
    }
    return this.recordsState.selectedItemSource$.value;
  }
}
