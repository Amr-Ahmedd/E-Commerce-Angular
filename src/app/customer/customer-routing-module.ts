import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Customer } from './customer';
import { Dashboard } from './components/dashboard/dashboard';
import { ProductDetails } from './components/product-details/product-details';

const routes: Routes = [
  { path: '', component: Customer },
  { path: 'dashboard', component: Dashboard },
  { path: 'product/:id', component: ProductDetails }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
