import { Component, OnInit } from '@angular/core';
// import { time } from 'console';
import { Subscription } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { now } from 'lodash';
import { Orders } from '../Model/logic-models';
import { iOrders } from '../Model/app-models';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();
  public get_ordersData: any;
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
    console.log(this.summary);
  }

  public clickDelete(orderId: number) {
    this.delete = true;
  }

  public ngOnInit() {
    const url = "https://localhost:5001/api/orders";
    const retVal = this.http.get(url).subscribe
    (data => {this.get_ordersData = data as Orders[];
    }, (error: any) => {
      console.error(error);
    });
  }
}



