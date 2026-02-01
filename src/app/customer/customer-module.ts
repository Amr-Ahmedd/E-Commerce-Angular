import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing-module';
import { Customer } from './customer';
import { Dashboard } from './components/dashboard/dashboard';

import { AngularMaterialModule } from '../AngularMaterialModule'; 
import { ProductDetails } from './components/product-details/product-details'; 

@NgModule({
  declarations: [
    Customer,
    Dashboard,
    ProductDetails
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    AngularMaterialModule  
  ]
})
export class CustomerModule { }
