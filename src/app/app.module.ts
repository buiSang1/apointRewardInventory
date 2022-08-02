import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NbLayoutModule, NbSidebarModule, NbButtonModule, NbInputModule, NbSelectModule, NbIconModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbCheckboxModule, NbActionsModule, NbToastrModule } from '@nebular/theme';
import { NbThemeModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { RewardInventorySearchComponent } from './components/reward-inventory-search/reward-inventory-search.component';
import { RewardOrderSearchComponent } from './components/reward-order-search/reward-order-search.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateFilterComponent } from './components/date-filter-component/date-filter-component.component';
import { CustomInputTextFilterComponent } from './components/custom-input-text-filter/custom-input-text-filter.component';
import { CustomInputSelectFilterComponent } from './components/custom-input-select-filter/custom-input-select-filter.component';
import { InventoryCreateComponent } from './components/inventory-create/inventory-create.component';
import { InventoryDialogDeleteComponent } from './components/inventory-dialog-delete/inventory-dialog-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    RewardInventorySearchComponent,
    RewardOrderSearchComponent,
    DateFilterComponent,
    CustomInputTextFilterComponent,
    CustomInputSelectFilterComponent,
    InventoryCreateComponent,
    InventoryDialogDeleteComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    NbThemeModule.forRoot(),
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    Ng2SmartTableModule,
    GraphQLModule,
    HttpClientModule,
    NbInputModule,
    NbEvaIconsModule,
    NbSelectModule,
    NbIconModule,
    NbCardModule,
    FormsModule,
    ReactiveFormsModule,
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbDialogModule.forChild(),
    NbCheckboxModule,
    NbActionsModule,
    NbToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
