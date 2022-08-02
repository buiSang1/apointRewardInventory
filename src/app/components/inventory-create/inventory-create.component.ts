import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Register_RewardInventory, Get_getRewardInvenById, Update_RewardInventory } from 'src/app/graphql.queries';

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.scss']
})
export class InventoryCreateComponent implements OnInit {
  selectedItem: string = '01';
  selectedItem1: string = '01';
  public status = '';
  selectedItem2: string = '01';
  data = {};
  registerForm: FormGroup;
  reward_inventory: any[] = [];
  public id: any;
  isCard: boolean = true;

  active_flag = false;

  toggleActive(active_flag: boolean) {
    this.active_flag = active_flag;
  }

  is_approve = false;

  toggleApprove(is_approve: boolean) {
    this.is_approve = is_approve;
  }

  constructor(
    private apollo: Apollo,
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
  ) {
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      price: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      total: new FormControl('', Validators.required),
      active_flag: new FormControl(false, Validators.required),
      shipping: new FormControl('', Validators.required),
      sold: new FormControl('', Validators.required),
      is_approve: new FormControl(false, Validators.required),
      image: new FormControl(''),

    });
  }
  RegisterInventory() {
    this.apollo
      .mutate({
        mutation: Register_RewardInventory,
        variables: {
          name: this.registerForm.controls['name'].value,
          description: this.registerForm.controls['description'].value,
          price: this.registerForm.controls['price'].value,
          type: this.registerForm.controls['type'].value,
          total: this.registerForm.controls['total'].value,
          active_flag: this.registerForm.controls['active_flag'].value,
          shipping: this.registerForm.controls['shipping'].value,
          sold: this.registerForm.controls['sold'].value,
          is_approve: this.registerForm.controls['is_approve'].value,
          image: this.registerForm.controls['image'].value,
        },
      })
      .subscribe((res: any) => {
        let reward_inventory = Object.assign([], this.reward_inventory);
        reward_inventory.unshift(res['Register']);
        this.reward_inventory = reward_inventory;
        this.router.navigate(['/']);
      });
  }
  getRewardInventory(id: string) {

    this.apollo
      .watchQuery({
        query: Get_getRewardInvenById,
        variables: {
          ID: id,

        },
      })
      .valueChanges.subscribe((res: any) => {
        this.data = res.data.getRewardInvenById
        this.registerForm.patchValue({ ...this.data })
      });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != '0') {
      this.getRewardInventory(this.id);
    }

  }
  updateRewardInventory() {
    this.apollo
      .mutate({
        mutation: Update_RewardInventory,
        variables: {
          id: this.id,
          name: this.registerForm.controls['name'].value,
          description: this.registerForm.controls['description'].value,
          price: this.registerForm.controls['price'].value,
          type: this.registerForm.controls['type'].value,
          total: this.registerForm.controls['total'].value,
          active_flag: this.registerForm.controls['active_flag'].value,
          shipping: this.registerForm.controls['shipping'].value,
          sold: this.registerForm.controls['sold'].value,
          is_approve: this.registerForm.controls['is_approve'].value,
          image: this.registerForm.controls['image'].value,
        },
      })
      .subscribe((res: any) => {
        let reward_inventory = Object.assign([], this.reward_inventory);
        reward_inventory.unshift(res['Update']);
        this.reward_inventory = reward_inventory;

        this.router.navigate(['/']);
      });
  }
  refresh(): void {
    window.location.reload();
  }
  clearForm() {
    this.registerForm.reset();
  }
  backInventoryList() {
    this.router.navigate(['/']);
  }
  toggleCard() {
    this.isCard = !this.isCard;
  }
}

