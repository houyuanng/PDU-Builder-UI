import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditInsertComponent } from './edit-insert/edit-insert.component';
import { NewInsertComponent } from './new-insert/new-insert.component';
import { NewMaterialComponent } from './new-material/new-material.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';
import { DesignComponent } from './design/design.component';
import { UserManualComponent } from './user-manual/user-manual.component'; 
import { OrdersComponent } from './orders/orders.component';
import { GreeterComponent } from './greeter/greeter.component';
import { OrderInformationComponent } from './design/order-information/order-information.component';
import { OrderSummaryComponent } from './orders/order-summary/order-summary.component';
import { OrderBomComponent } from './orders/order-bom/order-bom.component';
import { NewSpecsComponent } from './new-insert/new-specs/new-specs.component';
import { EditSpecsComponent } from './edit-insert/edit-specs/edit-specs.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  // { path: '', redirectTo: 'greeter', pathMatch: 'full'},
  { path: 'greeter', component: GreeterComponent },

  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'new-category', component: NewCategoryComponent },
  { path: 'edit-category', component: EditCategoryComponent },
  { path: 'edit-insert', component: EditInsertComponent },
  { path: 'new-insert', component: NewInsertComponent },
  { path: 'new-material', component: NewMaterialComponent },
  { path: 'edit-material', component: EditMaterialComponent },
  { path: 'design', component: DesignComponent },
  { path: 'user-manual', component: UserManualComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'design/order-information', component: OrderInformationComponent },
  { path: 'orders/order-summary', component: OrderSummaryComponent },
  { path: 'orders/order-bom', component: OrderBomComponent },
  { path: 'new-insert/new-specs' , component: NewSpecsComponent },
  { path: 'edit-inserts/edit-specs', component: EditSpecsComponent }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }