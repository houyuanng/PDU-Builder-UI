import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Table } from 'src/app/Model/app-models';
import { Orders } from 'src/app/Model/logic-models';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  constructor(private http: HttpClient) { }

  public get_orders: Orders[] = [];
  public informationLable: string[] = [
    ""
  ];

  ngOnInit(): void {
    const url = "https://localhost:5001/api/orders";
    const retVal = this.http.get(url).subscribe
    (data => {this.get_orders = data as Orders[];
      console.log(this.get_orders);
    }, (error: any) => {
      console.error(error);
    });
  }

  defineOrders() : Orders[]{
    return this.get_orders?? [];
  }

  tableContents() : Table[] {

    let content: Table[] = [{names: ["name"], content: ["contents"], prices: [0]}];
    return content?? []
  }

}
