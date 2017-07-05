/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

// import { DashboardComponent } from './features/dashboard.component';
import { NotFound404Component } from './not-found404.component';
import { ListComponent } from './component/list/list.component';
import { DetailComponent } from './component/detail/detail.component';

export const routes: Routes = [
  { path: '', component: ListComponent, pathMatch: 'full' },
  { path: 'product/:id', component: DetailComponent, pathMatch: 'full' },
  // { path: 'lazy', loadChildren: './features/lazy/index#LazyModule' },
  { path: '**', component: NotFound404Component }
];
