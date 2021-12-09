import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { UrlTree } from '@angular/router';
import mergeImages from 'merge-images';

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

  public something: Promise<string> | undefined;

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
    this.something = mergeImages([
      "/images/Insert real/012-8701 small.jpg",
      "/images/Insert real/032-8666 10 amp small.jpg", 
      "/images/Insert real/032-8666 10 amp small.jpg",
      {src: "/images/Insert real/012-8701 small.jpg",  x: 0, y: 30}
    ]).then(b64 => document.querySelector('img')!.src = b64);

    // this.something = mergeImages([
    //   { src: '/images/AP_logo.jpg', x: 0, y: 0 },
    //   { src: '/images/Insert real/032-8666 10 amp small.jpg', x: 32, y: 0 }
    // ])
    debugger;
    console.log(this.something);
  }
}