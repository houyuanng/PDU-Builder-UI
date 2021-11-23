import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
  folder: string = "/images/Insert real/";
  // contents = ["https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png", "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png", "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png", "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png", "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png", "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png", "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png", "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png", "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png", "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"];
  contents = [
    this.folder + "032-8666 10 amp small.jpg", 
    this.folder + "053-8642 small.jpg", 
    this.folder + "053-8642 small.jpg", 
    this.folder + "CEM tek.jpg", 
    this.folder + "C13 lockable.jpg", 
    this.folder + "053-8642 small.jpg", 
    this.folder + "012-8701 small.jpg", 
    this.folder + "22-8673 small.jpg"
  ]
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.contents, event.previousIndex, event.currentIndex);
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