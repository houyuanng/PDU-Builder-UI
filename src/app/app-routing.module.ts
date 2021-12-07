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
import { ViewSummaryComponent } from './view-summary/view-summary.component';
import { ViewBomComponent } from './view-bom/view-bom.component';

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
  { path: 'orders/order-summary', component: ViewSummaryComponent },
  { path: 'orders/order-bom', component: ViewBomComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }