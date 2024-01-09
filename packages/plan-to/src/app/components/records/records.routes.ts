import {ActivatedRouteSnapshot, provideRouter, Route, RouterStateSnapshot} from '@angular/router';
import {RecordsStateService} from '../../services/records-state.service';
import {inject} from '@angular/core';
import {RecordsApiService} from '../../services/records-api.service';
import {provideState} from '@ngrx/store';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {keyInterceptor} from '../../interceptors/key.interceptor';
import {RecordsSignalStateService} from "../../services/records-signal-state.service";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {filter, tap} from "rxjs";

export default [
  {
    path: '',
    title: 'Records',
    loadComponent: () => import('./records.component').then((c) => c.RecordsComponent),
    providers: [
      RecordsStateService,
      RecordsSignalStateService,
      RecordsApiService
    ],
    children: [
      {
        path: 'create',
        title: 'Create Record',
        loadComponent: () => import('./components/record-editor/record-editor.component').then((c) => c.RecordEditorComponent),
      },
      {
        path: ':id',
        redirectTo: ':id/overview',
        pathMatch: 'prefix'
      },
      {
        path: ':id/overview',
        title: 'Overview',
        loadComponent: () => import('./components/record-overview/record-overview.component').then((c) => c.RecordOverviewComponent)
      },
      {
        path: ':id/editor',
        title: 'Editor',
        loadComponent: () => import('./components/record-editor/record-editor.component').then((c) => c.RecordEditorComponent),
        providers: [
          provideHttpClient(
            withInterceptors([keyInterceptor]),

          )
        ],
        resolve: {
          selectedItem: (route: ActivatedRouteSnapshot) => {
            const [recordsState, id] = [inject(RecordsSignalStateService), route.params['id']];
            const record = recordsState.selectedRecord();

            if (record && record._id === id) return record;

            recordsState.getRecord(id);

            return toObservable(recordsState.selectedRecord).pipe(
              filter(record => !!record)
            );
          }
        }
      }
    ]
  },
] as Route[];
