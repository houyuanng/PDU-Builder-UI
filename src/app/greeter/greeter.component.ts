import { Component, OnDestroy, OnInit } from '@angular/core';
import { HelloRequest, HelloReply } from 'src/Generated/greet_pb';
import { Greeter, GreeterClient, ServiceError } from 'src/Generated/greet_pb_service';
import { Subscription } from 'rxjs';
import {grpc} from "@improbable-eng/grpc-web";
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

  public PostData() {
    // const url = "http://localhost:49528/api/Home";
    const url = "https://localhost:5001/api/products";
    const retVal = this.http.post(url, {fstVarValue: '111', scndVarValue: '222'}).subscribe
    (data => {this.retPostData = data;
    });
  }


  public ngOnInit() {

    const getRequests = new HelloRequest();

    grpc.unary(Greeter.SayHello, {
      request: getRequests,
      host: "https://localhost:5001", 
      onEnd: res => {
        const { status, message } = res;
        if (status === grpc.Code.OK && message) {
          var result = message.toObject() as HelloReply.AsObject;
          this.response = result;
          console.log("============================the grpc code: " + grpc.Code);
        }
        else{
          console.log("============================the grpc code: " + grpc.Code);
        }
      }
    });
  }
}
    
