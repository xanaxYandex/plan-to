import {ActivatedRouteSnapshot, provideRouter, Route, RouterStateSnapshot} from '@angular/router';
import {RecordsStateService} from '../../services/records-state.service';
import {inject} from '@angular/core';
import {RecordsApiService} from '../../services/records-api.service';
import {provideState} from '@ngrx/store';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {keyInterceptor} from '../../interceptors/key.interceptor';

export default [
  {
    path: '',
    title: 'Records',
    loadComponent: () => import('./records.component').then((c) => c.RecordsComponent),
    providers: [
      RecordsStateService,
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
          selectedItem: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
            const [recordsState, id] = [inject(RecordsStateService), route.params['id']];

            if(recordsState.selectedItemSource$.value?._id !== id) {
              recordsState.getRecord(id);
              return recordsState.selectedItemSource$;
            }
            return recordsState.selectedItemSource$.value;
          }
        }
      }
    ]
  },
] as Route[];
