import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryCreateComponent } from './components/inventory-create/inventory-create.component';
import { RewardInventorySearchComponent } from './components/reward-inventory-search/reward-inventory-search.component';
import { RewardOrderSearchComponent } from './components/reward-order-search/reward-order-search.component';

const routes: Routes = [
  { path: '', component: RewardInventorySearchComponent },

  { path: 'project/:id', component: InventoryCreateComponent },

  { path: 'reward-order', component: RewardOrderSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
