import { Component, OnInit } from '@angular/core';
// import { time } from 'console';
import { Subscription } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { now } from 'lodash';

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
  }

  public clickDelete(orderId: number) {
    this.delete = true;
  }

  public ngOnInit() {
    const url = "https://localhost:5001/api/orders";
    const retVal = this.http.get(url).subscribe
    (data => {this.get_ordersData = data as Order[];
    }, (error: any) => {
      console.error(error);
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