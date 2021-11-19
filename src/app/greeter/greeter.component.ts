import { Component, OnDestroy, OnInit } from '@angular/core';
import { HelloRequest, HelloReply } from 'src/Generated/greet_pb';
import { Greeter, GreeterClient, ServiceError } from 'src/Generated/greet_pb_service';
import { Subscription } from 'rxjs';
import {grpc} from "@improbable-eng/grpc-web";

@Component({
  selector: 'app-greeter',
  templateUrl: './greeter.component.html',
  styleUrls: ['./greeter.component.css']
})
export class GreeterComponent {
  private subscriptions: Subscription = new Subscription();
  public response: {} = {};
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
    
