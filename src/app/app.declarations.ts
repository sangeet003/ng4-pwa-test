import { DashboardComponent } from './features/dashboard.component';
import { NotFound404Component } from './not-found404.component';
import { ListComponent } from './component/list/list.component';
import { ProductCard } from './directive/card/card';
import {DetailComponent} from "./component/detail/detail.component";

export const APP_DECLARATIONS = [
  DashboardComponent,
  ListComponent,
  ProductCard,
  DetailComponent,
  NotFound404Component
];
