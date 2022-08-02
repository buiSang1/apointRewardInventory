import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryCreateComponent } from './components/inventory-create/inventory-create.component';
import { RewardInventorySearchComponent } from './components/reward-inventory-search/reward-inventory-search.component';

const routes: Routes = [
  { path: '', component: RewardInventorySearchComponent },

  { path: 'project/:id', component: InventoryCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
