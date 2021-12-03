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
  public orderNumber: number = 0;

  public company:string = "";
  public contactPerson: string = "";
  public amount: number = 0;
  public description: string = "";
  public phoneNumber: number = 0;
  public email: string = "";  

  constructor() { }

  ngOnInit(): void {
  }

  write(data: any) {
    this.test = data;
  }
  // onKeyUp_categoryName(event: any) {
  //   this.inputCategoryName = event.target.value;
  // }


  input_companyName(event: any) {
    if (event.key == 'Enter'){
      this.company = event.target.value;
      this.write(event.target.value);
    }
  }

  input_contactPerson(event: any) {
    if (event.key == 'Enter'){
      this.contactPerson = event.target.value;
      this.write(event.target.value);
    }
  }

  input_amount(event: any) {
    if (event.key == 'Enter'){
      this.amount = event.target.value;
      this.write(event.target.value);
    }
  }

  input_description(event: any) {
    if (event.key == 'Enter'){
      this.description = event.target.value;
      this.write(event.target.value);
    }
  }
  input_number(event: any) {
    if (event.key == 'Enter'){
      this.phoneNumber = event.target.value;
      this.write(event.target.value);
    }
  }

  input_email(event: any) {
    if (event.key == 'Enter'){
      this.email = event.target.value;
      this.write(event.target.value);
    }
  }

  // send stuff over to database
  clickCreateOrder() {
    this.write("clicked");

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