import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  constructor() { }

  public inputCategoryName: string = "";
  public output: string = ""
  public event_save: string = "";

  ngOnInit(): void {

  }


  // event binding for category input and submit key pressed
  onKeyUp_categoryName(event: any) {
    if (event.key == 'Enter'){
      this.inputCategoryName = event.target.value;
    }
  }

  onSubmit() {
    this.event_save = "clicked";
    this.output = this.inputCategoryName;

  }
}
