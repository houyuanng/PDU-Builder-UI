import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Category } from '../Model/app-models';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent{

  constructor(private http: HttpClient) {};
  private subscriptions: Subscription = new Subscription();

  public allCatsUrl = "https://localhost:5001/api/categories";
  public editCatUrl = "https://localhost:5001/api/categories/edit";

  public get_categories: Category[] = [];
  public searchedCat: string = "";

  public newCategoryEntry: Category = { category: "", thumbnail_addr: ""};

  ngOnInit() {
    let allCats: Category[] = this.getAllCats();
  }

  getAllCats() : Category[]{
    this.http.get(this.allCatsUrl).subscribe
    (data => { this.get_categories = data as Category[]; }, 
      ( error => { console.log(error) })
    );
    return this.get_categories;
  }

  pushEditedCategory(searchByCategory: string, updateWithCategory: Category) {
    this.http.post(this.editCatUrl, {searchByCategory, updateWithCategory}).subscribe( error => 
      { console.log(error) });
  }

  clickSave(){
  console.log(this.newCategoryEntry);
  this.pushEditedCategory(this.searchedCat, this.newCategoryEntry);
  }
}
