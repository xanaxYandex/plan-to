import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SelectedItemResolver} from '../../shared/resolvers/selected-item.resolver';
import {RecordEditorComponent} from './components/record-editor/record-editor.component';
import {RecordOverviewComponent} from './components/record-overview/record-overview.component';
import {RecordsComponent} from './records.component';

const routes: Routes = [
  {
    path: '',
    title: 'Records',
    component: RecordsComponent,
    children: [
      {
        path: 'create',
        title: 'Create Record',
        component: RecordEditorComponent
      },
      {
        path: ':id',
        redirectTo: ':id/overview',
        pathMatch: 'prefix'
      },
      {
        path: ':id/overview',
        title: 'Overview',
        component: RecordOverviewComponent
      },
      {
        path: ':id/editor',
        title: 'Editor',
        component: RecordEditorComponent,
        resolve: {
          selectedItem: SelectedItemResolver
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordsRoutingModule { }
