import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
  contents = ["Insert 1", "insert 2", "Insert 3", "Insert 4", "insert 5", "Insert 6", "Insert 7", "insert 8", "Insert 9", "Insert 10"];
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.contents, event.previousIndex, event.currentIndex);
  }


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