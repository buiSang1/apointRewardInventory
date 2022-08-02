import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NbDatepicker } from '@nebular/theme';
import { Apollo, gql } from 'apollo-angular';
import { CustomInputSelectFilterComponent } from '../custom-input-select-filter/custom-input-select-filter.component';
import { CustomInputTextFilterComponent } from '../custom-input-text-filter/custom-input-text-filter.component';
import { DateFilterComponent } from '../date-filter-component/date-filter-component.component';


const Get_getAllRewardOrder = gql `
query{
  getAllRewardOrder{
    _id
    status
    reward_id{
      name
      price
      total
      description
      _id
    }
    create_at
    remark
    create_by
    user_id{
      name
      username
      email
    }
    
  }
  
}
` 

const Get_searchRewardOrder = gql `
query(
  $USER: String,
  $REWARD: String,
  $STATUS: String!,
  $FROM: Float
  $TO: Float
)
{
  searchRewardOrder(
    filter:{
      user:$USER, 
      reward:$REWARD,
      status: $STATUS,
      from: $FROM,
      to: $TO
      }){
    _id
    user_id {
      _id
      name
    }
    reward_id {
      _id
      name
    }
    status
    remark
    create_at
  }
}
`

@Component({
  selector: 'app-reward-order-search',
  templateUrl: './reward-order-search.component.html',
  styleUrls: ['./reward-order-search.component.scss']
})
export class RewardOrderSearchComponent implements OnInit {
  reward_order: any[] = [];

  isCard: boolean = true;
  isBelowCard: boolean = true;

  
  constructor(private apollo: Apollo,
    private fb: FormBuilder,
    ) { }

    searchOrderForm =  this.fb.group({
      user: [''],
      reward: [''],
      status: [''],
      remask:[''],
      create_at: [{start: new Date(), end: new Date()}],
     /*  to: [new Date()], */
    })

   /*  fromdate = JSON.parse(JSON.stringify(this.searchOrderForm.controls["from"].value)!).start;
    todate = JSON.parse(JSON.stringify(this.searchOrderForm.controls["from"].value)!).end; */
  ngOnInit(): void {
    this.LoadRewardOrder();
  }

  settings = {
    actions: {
      custom: [
        {
          name: 'edit',
          title:'<img src="assets/icons/nb-edit.svg" width="30" height="30">',
        },
        {
          name: 'delete',
          title:'<img src="assets/icons/nb-trash.svg" width="30" height="30">'
        },
        ],
        add: false,
        edit: false,
        delete: true,
        
  },
    columns: {
      user_id: {
        title: 'USER',
        filter: {
          type: "custom",
          component: CustomInputTextFilterComponent,
          config: { placeholder: "User" },
        },
       
        valuePrepareFunction: (user_id: any) => {
          if(user_id) {
            return user_id.name
          }
          else {return null}
        },
        filterFunction: (cell: {name: string}, search:string): boolean => {
          return cell.name.includes(search)

        }
      },
      reward_id: {
        title: 'REWARD INVENTORY',
        filter: {
          type: "custom",
          component: CustomInputTextFilterComponent,
          config: { placeholder: "Reward" },
        },
        valuePrepareFunction: (reward_id: any) => {
          if(reward_id) {
            return reward_id.name
          }
          else {return null}
        },
        filterFunction: (cell: {name: string}, search:string): boolean => {
          if(cell) {
            return cell.name.includes(search);
          } else {
            return false
          }
          
        }
      },
      status: {
        title: 'STATUS',
        filter: {
          type: 'custom',
          component: CustomInputSelectFilterComponent,
          config: {
            selectText: 'Select Status',
            list: [
              {value: '', title: 'Select Status'},
              {value: '01', title: 'New'},
              {value: '02', title: 'Approved'},
              {value: '03', title: 'Claimed'},

            ]
          }
        },
        valuePrepareFunction: (value: any) => {
          if(value === '01') {
            return 'New'
          }
          if(value === '02') { 
            return 'Approved'
          }
          if(value === '03') {
            return 'Claimed'
          }
          else {return }
        }
      },
      remark: {
        title: 'REMARK',
        filter: {
          type: "custom",
          component: CustomInputTextFilterComponent,
          config: { placeholder: "Remark" },
        },
        sort: true,
      },
      create_at: {
        title: 'TIME REQUEST',
        filter: {
          type: 'custom',
          component: DateFilterComponent
        },
        sort: true,
        valuePrepareFunction: (value: any) => {
          if(!value) {
            return '';
          } else {
            return new Date(value * 1000).toLocaleDateString('vi');
          }
        },
        filterFunction: (value: any, query: string) => {
          const range = JSON.parse(query)
          const start = Math.round(new Date(range.start).getTime()/1000) /* new Date(range.start).getTime()  */
          const end = Math.round(new Date(range.end).getTime()/1000) /* new Date(range.end).getTime() */
          const date = value
        
          console.log(range)
          if(start <= date && date <= end) {
            return start <= date && date <= end
          }
          else {return false}
          
        },
      },
    }
  };

  toggleCard(){
    this.isCard = !this.isCard;
  }

  toogleBelowCard() {
    this.isBelowCard = !this.isBelowCard;
  }

  LoadRewardOrder() {
    this.apollo
    .watchQuery({
      query: Get_getAllRewardOrder,

    })
    .valueChanges.subscribe((res: any) => {

      this.reward_order = res?.data?.getAllRewardOrder;
      
      console.log("data Reward Order", this.reward_order);
    })
   }


   searchRewardOrder() {
    this.apollo
      .watchQuery({
        query: Get_searchRewardOrder,
        variables:
        {
          USER: this.searchOrderForm.controls["user"].value,
          REWARD: this.searchOrderForm.controls["reward"].value,
          STATUS: this.searchOrderForm.controls["status"].value,
          FROM: Math.round(new Date(JSON.parse(JSON.stringify(this.searchOrderForm.controls["create_at"].value)!).start).getTime()/1000), 
          TO:  Math.round(new Date(JSON.parse(JSON.stringify(this.searchOrderForm.controls["create_at"].value)!).end).getTime()/1000),
          /*  FROM:  Math.round(new Date(this.searchOrderForm.controls["from"].value!).getTime()/1000), */ 
          /* TO: Math.round(new Date(this.searchOrderForm.controls["to"].value!).getTime()/1000) */ 

        }
      })
      .valueChanges.subscribe((res: any) => {

        this.reward_order = res?.data?.searchRewardOrder;
        console.log("Search Reward Order: ", this.reward_order)
      })
   }

   resetSearchForm() {
    
    this.searchOrderForm.reset();
    this.searchOrderForm.get('user')?.reset('');
    this.searchOrderForm.get('reward')?.reset('');
    this.searchOrderForm.get('status')?.reset('');
    this.searchOrderForm.get('remask')?.reset('');
    this.searchOrderForm.get('create_at')?.reset({start: new Date(), end: new Date()});
    /* this.searchOrderForm.get('to')?.reset(new Date()); */
    
  }

  Logdata(datepicker: any) {
    console.log(datepicker);
  }
}


