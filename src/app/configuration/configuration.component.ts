import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  categoryControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  categories: Categories[] = [
    {name: 'Categories'},
    {name: 'Inserts'},
    {name: 'Material'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

interface Categories {
  name: string;
}