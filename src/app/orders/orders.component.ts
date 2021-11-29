import { Component, OnInit } from '@angular/core';
// import { time } from 'console';
import { Subscription } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();
  public dataGET: any;
  public datatPOST: any;


  constructor(private http: HttpClient) { }

  public bom: number = 0;
  public order: number = 0;
  public summary: number = 0;
  public delete: boolean = false;

  public clickViewOrder(orderId: number) {
    this.order = orderId;
  }

  public clickViewBom(orderId: number) {
    this.bom = orderId;
  }

  public clickViewSummary(orderId: number) {
    this.summary = orderId;
  }

  public clickDelete(orderId: number) {
    this.delete = true;
  }

  public ngOnInit() {
    const url = "https://localhost:5001/api/orders";
    const retVal = this.http.get(url).subscribe
    (data => {this.dataGET = data;
    });
  }

}

interface iOrders{
  orderId: number;
  companyName: string;
  lastEdit: Number;
  viewOrderString: string;
  viewBomString: string;
  viewSummaryString: string;
  delete: boolean;
}


  // MOCK DATA:
  // content = ["one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three"];

  // orders = ["order 1", "order 3", "order 2", "order 4", "order 5", "order 55", "order 6", "order 7", "order 8", "order 9", "order 10", "order 11", "order 12", "order 13"]

  // public orders: iOrders[] = [
  //   {orderId: 0, companyName: "name 1", lastEdit: Date.now(), viewOrderString: "a", viewBomString: "u", viewSummaryString: "t", delete: false},
  //   {orderId: 1, companyName: "name 2", lastEdit: Date.now(), viewOrderString: "q", viewBomString: "y", viewSummaryString: "jr", delete: false},
  //   {orderId: 2, companyName: "name 2", lastEdit: Date.now(), viewOrderString: "w", viewBomString: "t", viewSummaryString: "j", delete: false},
  //   {orderId: 3, companyName: "name 1", lastEdit: Date.now(), viewOrderString: "e", viewBomString: "ft", viewSummaryString: "j", delete: false},
  //   {orderId: 4, companyName: "name 3", lastEdit: Date.now(), viewOrderString: "e", viewBomString: "h", viewSummaryString: "s", delete: false},
  //   {orderId: 5, companyName: "name 3", lastEdit: Date.now(), viewOrderString: "r", viewBomString: "b", viewSummaryString: "s", delete: false},
  //   {orderId: 6, companyName: "name 4", lastEdit: Date.now(), viewOrderString: "t", viewBomString: "s", viewSummaryString: "s", delete: false},
  //   {orderId: 7, companyName: "name 5", lastEdit: Date.now(), viewOrderString: "y", viewBomString: "h", viewSummaryString: "s", delete: false},
  //   {orderId: 8, companyName: "name 6", lastEdit: Date.now(), viewOrderString: "u", viewBomString: "j", viewSummaryString: "j", delete: false},
  // ];