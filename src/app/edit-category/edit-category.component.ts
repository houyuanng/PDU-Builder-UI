import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent{

  constructor(private http: HttpClient) {};
  private subscriptions: Subscription = new Subscription();

  public get_categories: Category[] = [];
  public newName: string = "";

  ngOnInit() {

    this.getData();
  }

  public onSubmit_renameCategory(event: any) {
    this.newName = event.target.value;
    if (event.key == 'Enter'){
      this.newName = "event.target.value";
      return event.target.value;
    }
  }

  public getData() {
    const url = "https://localhost:5001/api/categories";
    const retVal = this.http.get(url).subscribe
    (data => {this.get_categories = data as Category[];
    });
  }

  clickSave(){
  this.newName = "clicked on save";
  }
}

class Category {
  category: string = "";
  thumbnail_addr: string = "";
}