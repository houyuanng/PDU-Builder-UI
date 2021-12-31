import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  public homeUrl = "https://localhost:44387/api/home";
  public doneUpdating:boolean = false;

  ngOnInit(): void {
    this.http.get(this.homeUrl).subscribe(),
    ((error: any) => {
      console.error(error);
    });
  }

  updateAll(){
    console.log("clicked on update button");
    let message: string = "updateAll";
    this.http.post(this.homeUrl, message).subscribe
    (data => {
      this.doneUpdating = data as boolean;
      if (this.doneUpdating){
        // console.log(this.doneUpdating);
        this.doneUpdating = false; 
        // console.log(this.doneUpdating);
      }
    }),
    ((error: any) => {
      console.error(error);
    });
  }
  
  myusername: string = "";

  blurEvent(event: any){
    if (event.key === "Enter") {
      this.myusername = "enter";
    }
    else {
      this.myusername = event.target.value;
    }
  }

  key: string = "";
  onKeyDown(event: any) {
    if (event.key === "Enter") {
      console.log(event);
      this.key = event.target.value;
    }
  }

}
