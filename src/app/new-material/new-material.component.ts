import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { materialize } from 'rxjs/operators';

@Component({
  selector: 'app-new-material',
  templateUrl: './new-material.component.html',
  styleUrls: ['./new-material.component.css']
})
export class NewMaterialComponent implements OnInit {

  constructor(private http: HttpClient) { }

  url = "https://localhost:5001/api/masterdatabase";
  public retGetData: any = {};
  public dataLen: number = 0;

  public inputProcessName: string = "";
  public inputProcessTime: string = "";
  
  public inputProfileReferenceNumber: string = "Profile reference number";
  public viewProfileName: string = "Profile name";
  public viewProfilePrice: number = 0.00;
  public clickSearchProfile: boolean = false;
  public foundMaterial: boolean = false;
  public materialIndex: number = 0;

  public inputMaterialReferenceNumber: string = "Material reference number";
  public viewMaterialName: string = "Material name";
  public viewMaterialPrice: number = 0.00;
  public clickSearchMaterial: boolean = false;
  public foundProfile: boolean = false;
  public profileIndex: number = 0;

  public clickSave: boolean = false;

  ngOnInit(): void {
    const postVal = this.http.get(this.url).subscribe
    (data => {this.retGetData = data;
      this.dataLen = Object.keys(data).length;
    });
  }

  onKeyUp_processName(event: any) {
    if (event.keyCode === 13){  
      this.inputProcessName = event.target.value; 
    }
  }

  onKeyUp_processTime(event: any) {
    if (event.keyCode === 13){  
      this.inputProcessTime = event.target.value;
    }
  }

  // i dont get why the function with [if the input reference number dont match, to clear the viewing outputs] dont work
  onKeyUp_profileReferenceNumber(event: any) {
    this.inputProfileReferenceNumber = event.target.value;
    this.searchProfile(event.target.value);
  }
  

  onKeyUp_materialReferenceNumber(event: any) {
    this.inputMaterialReferenceNumber = event.target.value;
    this.searchMaterial(event.target.value);
  }

  click_searchMaterial(){
    this.clickSearchMaterial = true;
  }

  click_searchProfile(){
    this.clickSearchProfile = true;
  }

  click_saveItems() {
    this.clickSave = true;
    if (this.clickSearchMaterial) {
      let sendMaterial: string;
      sendMaterial = this.inputMaterialReferenceNumber + "," + this.viewMaterialName + "," + this.viewMaterialPrice;
      this.clickSearchMaterial = false;
    }
    if (this.clickSearchProfile) {
      let sendProfile: string;
      sendProfile = this.inputProfileReferenceNumber + "," + this.viewProfileName + "," + this.viewProfilePrice;
      this.clickSearchProfile = false;
    }
    if (this.inputProcessName != "") {
      let sendProcess: string;
      if (this.inputProcessTime != ""){
        sendProcess = this.inputProcessName + "," + this.inputProcessTime;
      }
      else {
        sendProcess = this.inputProcessName + "," + "0";  // if time is empty then its 0 minutes
      }
    }
    
    // send this over http
  }

  public test: string = "";
  searchMaterial(input: number) {
    for (let i = 0; i < this.dataLen; i++){
      if (input == this.retGetData[i].itemId) {
        this.foundMaterial = true;
        this.materialIndex = i;
      }
    }

    if (this.foundMaterial){
      this.viewMaterialName = this.retGetData[this.materialIndex].material_name;
      this.viewMaterialPrice = this.retGetData[this.materialIndex].price;
      this.foundMaterial = false;
    } else {
      this.viewMaterialName = "";
      this.viewMaterialPrice = 0;
    }
  }

  searchProfile(input: number) {
    for (let i = 0; i < this.dataLen; i++){
      if (input == this.retGetData[i].itemId) {
        this.foundProfile = true;
        this.profileIndex = i;
      }
    }

    if (this.foundProfile){
      this.viewProfileName = this.retGetData[this.profileIndex].material_name;
      this.viewProfilePrice = this.retGetData[this.profileIndex].price;
      this.foundProfile = false;
    } else {
      this.viewProfileName = "";
      this.viewProfilePrice = 0;
    }
  }

  formatAllData(){
    let newMaterial: Material[];
    let newProfile: Material[];
    let newProcess: Process[];

    newMaterial = [
      { 
        NAME : this.viewMaterialName,
        PRICE : this.viewMaterialPrice,
        REFERENCE_ID : this.inputMaterialReferenceNumber,
        DESCRIPTION : "MATERIAL"
    }];

    newProfile = [
      {
        NAME : this.viewProfileName,
        PRICE : this.viewProfilePrice,
        REFERENCE_ID : this.inputProfileReferenceNumber,
        DESCRIPTION : "PROFILE"
      }];

      // newProcess = [
      //   {
      //     PROCESS; thi
      //   }
      // ];
  }

}

interface Material {
  NAME: string;
  PRICE: number;
  REFERENCE_ID: string;
  DESCRIPTION: string;
}

interface Process {
  PROCESS: string;
  MINUTES: number;
}

