import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { UrlTree } from '@angular/router';

@Component({
  selector: 'app-greeter',
  templateUrl: './greeter.component.html',
  styleUrls: ['./greeter.component.css']
})
export class GreeterComponent {

  constructor(private http: HttpClient) { }

  private subscriptions: Subscription = new Subscription();
  public response: {} = {};
  public retPostData: any;
  public retGetData: any;
  public matData: any;
  public test: any;

  public PostData() {
    // const url = "http://localhost:49528/api/Home";
    const url = "https://localhost:5001/api/materials";
    const retVal = this.http.post(url, {fstVarValue: '111', scndVarValue: '222'}).subscribe
    (data => {this.retPostData = data;
    });
  }

  public testPostdata: any;
  public ngOnInit() {
    const url = "https://localhost:5001/api/orders";

    // const url = "http://localhost:49528/api/Home";
    // const retVal = this.http.get(url).subscribe
    // (data => {this.retGetData = data;
    // });

    let something: Material = {
      NAME: "hou yuan",
      PRICE: 1000000,
      REFERENCE_ID: "546841321",
      DESCRIPTION: "profile"
    };

    const postVal = this.http.post(url, {fstVarValue: '111'}).subscribe
    (data => {this.retPostData = data;
    });
    
    const postMatVal = this.http.post("https://localhost:5001/api/materials", {something}).subscribe
    (data => {this.matData = data;
    }, (error: any) => {
      console.error(error);
    });

  }
}

interface Send{
  fstVal: string;
}


interface Material {
  NAME: string;
  PRICE: number;
  REFERENCE_ID: string;
  DESCRIPTION: string;
}

