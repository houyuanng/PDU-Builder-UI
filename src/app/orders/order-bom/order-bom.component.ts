import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AnyFieldType } from 'google-protobuf';
import { Bom } from 'src/app/Model/app-models';
import { table } from 'console';

@Component({
  selector: 'app-order-bom',
  templateUrl: './order-bom.component.html',
  styleUrls: ['./order-bom.component.css']
})
export class OrderBomComponent implements OnInit {

  constructor(private http: HttpClient) { }
  
  url_orderBom = "https://localhost:44387/api/orderbom";
  url_insertProc = "https://localhost:44387/api/insertprocess";

  public get_bomData: Bom[] = [];
  public bomDataCount: number = 0;

  public get_procData: any;

  ngOnInit(): void {
    const getBomVal = this.http.get(this.url_orderBom).subscribe
    (data => {this.get_bomData = data as Bom[];
      this.bomDataCount = Object.keys(data).length;
    }, (error: any) => {
      console.log(error);
    });

    this.http.get(this.url_insertProc).subscribe
    (data => {this.get_procData = data as Process[];
      // this.bomDataCount = Object.keys(data).length;
    }, (error: any) => {
      console.log(error);
    });
  }

  allBom() : MaterialElement[]{
    let tableContent: MaterialElement[] = [];
    for (let material of this.get_bomData){
      tableContent.push({
        item : material.itemId,
        name : material.name,
        amount : material.amount
      });
    }
    for (let process of this.get_procData){
      tableContent.push({
        item : process.process,
        name : process.process + " in minutes",
        amount : process.minutes
      });
    }
    console.log(tableContent);
    return tableContent;
  }
}

export class MaterialElement{
  item: string = "";
  name: string = "";
  amount: number = 0;
}

export class Process{
  process: string = "";
  minutes: number = 0;
}