import { Component, OnInit } from '@angular/core';
import { HelloRequest, HelloReply } from 'src/Generated/greet_pb';
import { GreeterClient, ServiceError } from 'src/Generated/greet_pb_service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-greeter',
  templateUrl: './greeter.component.html',
  styleUrls: ['./greeter.component.css']
})
export class GreeterComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();
  public response: string = "no test response yet...";

  ngOnInit(): void {
    const client = new GreeterClient('https://localhost:5001');
    const req = new HelloRequest();
    req.setName("World!");
    client.sayHello(req, (err: ServiceError|null, response: HelloReply|null) => {
      if (err) {
        this.response = `Error: ` + err.message + ':' + response;
        return;
      }
      this.response = response!.getMessage();
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
