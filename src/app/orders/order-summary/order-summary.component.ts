import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  constructor(private http: HttpClient) { }

  public get_orders: Order[] = [];

  ngOnInit(): void {
    const url = "https://localhost:5001/api/orders";
    const retVal = this.http.get(url).subscribe
    (data => {this.get_orders = data as Order[];
      console.log(this.get_orders);
    }, (error: any) => {
      console.error(error);
    });
  }

  defineOrders() : Order[]{
    return this.get_orders?? [];
  }

  tableContents() : Table[] {

    let content: Table[] = [{names: ["name"], content: ["contents"], prices: [0]}];
    return content?? []
  }

}

class Order {
  order_id: number = 0;
  real_design_img_addr: string = "";
  schem_design_img_addr: string = "";
  length_in_mm: number = 0;
  BOM_addr: string = "";
  company_name: string = "";
  last_edit: string = "";
  xl_calculation_addr: string = "";
  insert_id_sequence_addr: string = "";
}

class Table {
  names: string[] = [];
  content: string[] = [];
  prices: number[] = [];
}