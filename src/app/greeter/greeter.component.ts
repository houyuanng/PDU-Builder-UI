import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

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

  public PostData() {
    // const url = "http://localhost:49528/api/Home";
    const url = "https://localhost:5001/api/materials";
    const retVal = this.http.post(url, {fstVarValue: '111', scndVarValue: '222'}).subscribe
    (data => {this.retPostData = data;
    });
  }

  public ngOnInit() {



    // const url = "http://localhost:49528/api/Home";
    const url = "https://localhost:5001/api/materials";
    // const retVal = this.http.get(url).subscribe
    // (data => {this.retGetData = data;
    // });

    const postVal = this.http.post(url, {fstVarValue: '111', scndVarValue: '222'}).subscribe
    (data => {this.retPostData = data;
    });
  }
}

    
