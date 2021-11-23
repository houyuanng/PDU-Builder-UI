import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-new-insert',
  templateUrl: './new-insert.component.html',
  styleUrls: ['./new-insert.component.css']
})
export class NewInsertComponent implements OnInit {

  constructor() { }
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  ngOnInit(): void {
  }

}
export class AutocompleteSimpleExample {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
}