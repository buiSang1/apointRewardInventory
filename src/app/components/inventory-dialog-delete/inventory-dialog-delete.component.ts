import { Component, Input, OnInit } from '@angular/core';
import { NbGlobalPhysicalPosition, NbGlobalLogicalPosition, NbToastrService, NbDialogRef, NbGlobalPosition, NbComponentStatus } from '@nebular/theme';
import { Apollo } from 'apollo-angular';
import { Delete_RewardInventory, Get_getAllRewardInventory } from 'src/app/graphql.queries';

@Component({
  selector: 'app-inventory-dialog-delete',
  templateUrl: './inventory-dialog-delete.component.html',
  styleUrls: ['./inventory-dialog-delete.component.scss']
})
export class InventoryDialogDeleteComponent implements OnInit {

  reward_inventory: any[] = [];
  @Input() reward_id = '';
  public status = '';
  public idRewardInventory: any ;

  physicalPositions = NbGlobalPhysicalPosition;
  logicalPositions = NbGlobalLogicalPosition;


  constructor(private apollo: Apollo,
    private toastrService: NbToastrService,
    protected dialogRef: NbDialogRef<InventoryDialogDeleteComponent>
     ) { }
  private loadData() {
    this.apollo
      .watchQuery({
        query: Get_getAllRewardInventory,
        fetchPolicy: 'network-only'

      })
      .valueChanges.subscribe((res: any) => {
        this.reward_inventory = res?.data?.getAllRewardInventory;

      })
  }
  showToast(position: NbGlobalPosition, status: NbComponentStatus, duration: any ) {
     this.toastrService.show('', 'Inventory deleted successfully', {
       position,
       status,
       duration
     });
   }
  cancel() {
    this.dialogRef.close();
  }
  RemoveRewardInventory() {

    this.apollo
        .mutate({
          mutation: Delete_RewardInventory,
          variables: {
            id: this.reward_id,
          },
        })
        .subscribe((res: any) => {
          this.cancel();
          this.loadData();
        });
  }
  ngOnInit(): void {
    this.loadData();
  }
}
