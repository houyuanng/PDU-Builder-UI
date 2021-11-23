import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AboutComponent } from './about/about.component';
import { OrdersComponent } from './orders/orders.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditInsertComponent } from './edit-insert/edit-insert.component';
import { NewInsertComponent } from './new-insert/new-insert.component';
import { NewMaterialComponent } from './new-material/new-material.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';
import { DesignComponent } from './design/design.component';
import { UserManualComponent } from './user-manual/user-manual.component'; 
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatTreeModule } from '@angular/material/tree'; 
import { CdkTableModule } from '@angular/cdk/table'; 
import { MatDividerModule } from '@angular/material/divider'; 
import { DragDropModule } from '@angular/cdk/drag-drop'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSelectModule } from '@angular/material/select'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GreeterComponent } from './greeter/greeter.component';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatRadioModule } from '@angular/material/radio'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    OrdersComponent,
    ConfigurationComponent,
    NewCategoryComponent,
    EditCategoryComponent,
    EditInsertComponent,
    NewInsertComponent,
    NewMaterialComponent,
    EditMaterialComponent,
    DesignComponent,
    UserManualComponent,
    GreeterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatTreeModule,
    CdkTableModule,
    MatDividerModule,    
    DragDropModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatRadioModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
