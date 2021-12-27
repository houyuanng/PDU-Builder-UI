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

  public newCategory: string = "";
  public event_save: string = "";

  public urlCategory = "https://localhost:5001/api/categories";
  public urlNewCategory = "https://localhost:5001/api/categories/new";
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
    this.newCategory = event.target.value;
    console.log(this.newCategory);
    let correct: boolean = false;
    for (const category of this.get_categories){
      if (category.category == this.newCategory){
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

  clickSave() {
    this.event_save = "clicked";

    let output: Category = { category: this.newCategory, thumbnail_addr: "thumbnail" };

    this.http.post(this.urlNewCategory, {output}).subscribe(),
    (error: any) => {
      console.error(error);
    };
  }
}