import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from './admin';
import { Dashboard } from './components/dashboard/dashboard';

const routes: Routes = [
  { path: '', component: Admin },
  {path: "dashboard", component: Dashboard},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
