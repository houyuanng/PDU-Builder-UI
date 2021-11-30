import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-new-insert',
  templateUrl: './new-insert.component.html',
  styleUrls: ['./new-insert.component.css']
})
export class NewInsertComponent implements OnInit {

  constructor(private http: HttpClient) { }
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

  favoriteSeason: string | undefined;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  newInsertInput: string | undefined;

  public retGetData: any = {};
  public profiles: Profile[] = [];
  public dataLen: number = 0;

  public testVal: any;

  ngOnInit() {
    const url = "https://localhost:5001/api/materials";
    const retVal = this.http.get(url).subscribe
    (data => {this.retGetData = data;
      this.dataLen = Object.keys(data).length;
      // this.testVal = this.dataLen;
      for (let i = 0; i < this.dataLen; i++) {
        if (this.retGetData[i].description == "PROFILE"){
          this.profiles.push({
            NAME: this.retGetData[i].material_name,
            PRICE: this.retGetData[i].price,
            REFERENCE_ID: this.retGetData[i].itemId,
          });
          console.log("yes");
        }
      }
    });
  }


  getData() {
    const url = "https://localhost:5001/api/materials";
    const retVal = this.http.get(url).subscribe
    (data => {this.retGetData = data;
      this.dataLen = Object.keys(data).length;
    });

    // for (let i = 0; i < Object.keys(this.retGetData).length; i++){
    //   if (this.retGetData[i].description == "PROFILE"){
    //     this.testVal = "ret getvalue";
    //   }
    // }
  }
}

export class AutocompleteSimpleExample {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
}

interface Profile {
  NAME: string;
  PRICE: number;
  REFERENCE_ID: string;
}

interface Material {
  NAME: string;
  PRICE: number;
  REFERENCE_ID: string;
  DESCRIPTION: string;
}