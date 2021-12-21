import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Category } from '../Model/app-models';
import { FormControl } from '@angular/forms';
// import { FileUploadService } from '../file-upload.service';
// import { FileToUpload } from './file-to-upload';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  constructor(private http: HttpClient) { }

  public inputCategoryName: string = "";
  public event_save: string = "";

  public urlCategory = "https://localhost:5001/api/categories";
  public get_categories: Category[] = [];

  public exist: boolean = false;

  control = new FormControl(false);

  ngOnInit(): void {
    this.http.get(this.urlCategory).subscribe
    (data => {this.get_categories = data as Category[];
      console.log(data);
    },  (error: any) => {
      console.error(error);
    });
  }

  // event binding for category input and submit key pressed
  onKeyUp_categoryName(event: any) {
    this.inputCategoryName = event.target.value;
    console.log(this.inputCategoryName);
    let correct: boolean = false;
    for (const category of this.get_categories){
      if (category.category == this.inputCategoryName){
        console.log("category already exists!");
        correct = true;
      }
    }
    if (correct){
      this.exist = true;
    }
    else{ 
      this.exist = false;
    }
  }

  onSubmit() {
    this.event_save = "clicked";

    let output: Category = { category: this.inputCategoryName, thumbnail_addr: "thumbnail" };

    this.http.post(this.urlCategory, {output}).subscribe(),
    (error: any) => {
      console.error(error);
    };
  }
}