import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-edit-insert',
  templateUrl: './edit-insert.component.html',
  styleUrls: ['./edit-insert.component.css']
})
export class EditInsertComponent implements OnInit {

  constructor() { }
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  ngOnInit(): void {
  }

}
