import { Component, OnInit } from '@angular/core';
import { SERVER_TOKEN } from '@angular/flex-layout';

@Component({
  selector: 'app-order-information',
  templateUrl: './order-information.component.html',
  styleUrls: ['./order-information.component.css']
})
export class OrderInformationComponent implements OnInit {
  public test: any;

  // order number get from generation somewhere
  public orderNumber: number = 503;

  public company:string = "";
  public contactPerson: string = "";
  public amount: number = 0;
  public description: string = "";
  public phoneNumber: number = 0;
  public email: string = "";  

  constructor() { }

  ngOnInit(): void {
  }

  // onKeyUp_categoryName(event: any) {
  //   this.inputCategoryName = event.target.value;
  // }


  input_companyName(event: any) {
    this.company = event.target.value;
    
  }

  input_contactPerson(event: any) {
    this.contactPerson = event.target.value;
    
  }

  input_amount(event: any) {
    this.amount = event.target.value;
    
  }

  input_description(event: any) {
    this.description = event.target.value;
  }
  input_number(event: any) {
    this.phoneNumber = event.target.value;
  }

  input_email(event: any) {
    this.email = event.target.value;
  }

  // send stuff over to database
  clickCreateOrder() {

    let orderInfo: OrderInformation;

    orderInfo = {
      orderNumber: this.orderNumber, 
      companyName: this.company, 
      contactPerson: this.contactPerson, 
      amount: this.amount, 
      description: this.description, 
      phoneNumber: this.phoneNumber,
      email: this.email
    }
    console.log(orderInfo);
  }

}

interface OrderInformation {
  orderNumber: number;
  companyName: string;
  contactPerson: string;
  amount: number;
  description: string;
  phoneNumber: number;
  email: string;
}