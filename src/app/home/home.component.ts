import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
