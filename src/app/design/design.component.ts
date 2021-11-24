import { Component, OnInit } from '@angular/core';
import {CdkDrag, CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
 
  folder: string = "/images/Insert real/";
  public samples = [
    "032-8666 10 amp small.jpg", 
    "CEM tek.jpg", 
    "C13 lockable.jpg", 
    "053-8642 small.jpg", 
    "012-8701 small.jpg", 
    "22-8673 small.jpg"
  ]

  public contents: string[] = [];

  selectedProfile ='something';
  chosenProfile: Content = {name: ""};
  public save = false;
  test: string = "";
  public sequence = ["", "", "", "", "", "", "", ""];

  selectProfile(){
    this.chosenProfile = this.profiles.values;

  }

  blurEvent(event: any) {
    this.chosenProfile = event.target.value;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.contents, event.previousIndex, event.currentIndex);
  }

  clickSave(){
    // this.save = true;
    //  for some reason the tiles can only get in order when they are called individually. calling the whole array does not work :/
    for (let i = 0; i < this.contents.length; i++){
      this.sequence[i] = this.contents[i];
    }

    this.test = this.sequence[0];
  }

  yes: string = "";
  clickAddInsert(insert: string) {
    this.yes=insert;
    this.contents.push(insert);
  }

  profileNonEmptyControl = new FormControl('', Validators.required);
  profiles: Content[] = [
    {name: "OEC660"},
    {name: "OEC670"},
    {name: "OEC690"},
    {name: "OEC800"},
  ];

  categoryNonEmptyControl = new FormControl('', Validators.required);
  categories: Content[] = [
    {name: "cat1"},
    {name: "cat2"},
    {name: "cat3"},
    {name: "cat4"},
    {name: "cat5"},
    {name: "cat6"},
    {name: "cat7"},
  ]

  qControls = new FormControl('', Validators.required);
  questions: Content[] = [
    {name: "spec1"},
    {name: "spec2"},
    {name: "spec3"},
    {name: "spec4"},
    {name: "spec5"},
    {name: "spec6"},
    {name: "spe87"},
    {name: "spec9"},
    {name: "spec10"}
  ];

  animalControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'one'},
    {name: 'two'},
    {name: 'three'},
    {name: 'four'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

interface Animal {
  name: string;
}

interface Content {
  name: string;
}