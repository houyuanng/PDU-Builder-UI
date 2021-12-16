//edit the function names `clickEvent...`, `inputEvent...`

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { materialize } from 'rxjs/operators';
import { Process, Materials } from '../Model/logic-models';

@Component({
  selector: 'app-new-material',
  templateUrl: './new-material.component.html',
  styleUrls: ['./new-material.component.css']
})
export class NewMaterialComponent implements OnInit {

  constructor(private http: HttpClient) { }

  url_materialsdb = "https://localhost:5001/api/masterdatabase";
  url_process = "https://localhost:5001/api/process"

  public get_materialsData: any = {};
  public materialsDataCount: number = 0;
  public foundMaterial: boolean = false;
  public materialIndex: number = 0;
  public inputMaterialReferenceNumber: string = "Material reference number";
  public viewMaterialName: string = "Material name";
  public viewMaterialPrice: number = 0.00;
  public clickSearchMaterial: boolean = false;

  public get_processData: any = {};
  public inputProcessName: string = "";
  public inputProcessPrice: number = 0.00;
  public processDataCount: number = 0;
  public processExist: boolean = false;
  public processMessage: string = "";
  
  public inputProfileReferenceNumber: string = "Profile reference number";
  public viewProfileName: string = "Profile name";
  public viewProfilePrice: number = 0.00;
  public clickSearchProfile: boolean = false;
  public foundProfile: boolean = false;
  public profileIndex: number = 0;  

  public clickSave: boolean = false;

  public test: any = "";

  write(test: any){
    this.test = test;
  }

  ngOnInit(): void {
    const getProcesVal = this.http.get(this.url_process).subscribe
    (data => {this.get_processData = data;
      this.processDataCount = Object.keys(data).length;
    }, (error: any) => {
      console.log(error);
    });

    const getMaterialsVal = this.http.get(this.url_materialsdb).subscribe
    (data => {this.get_materialsData = data;
      this.materialsDataCount = Object.keys(data).length;

    }, (error: any) => {
      console.log(error);
    });
  }

  onKeyUp_processName(event: any) {
      this.inputProcessName = event.target.value;
      let exist = this.searchProcess(event.target.value);
  }

  onKeyUp_processTime(event: any) {
    if (event.keyCode === 13){  
      this.inputProcessPrice = event.target.value;
    }
  }

  onKeyUp_profileReferenceNumber(event: any) {
    this.inputProfileReferenceNumber = event.target.value;
    this.searchProfile(event.target.value);
  }


  onKeyUp_materialReferenceNumber(event: any) {
    this.inputMaterialReferenceNumber = event.target.value;
    this.searchMaterial(event.target.value);
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
      if (this.inputProcessPrice != 0){
        sendProcess = this.inputProcessName + "," + this.inputProcessPrice;
      }
      else {
        sendProcess = this.inputProcessName + "," + "0";  // if time is empty then its 0 minutes
      }
    }
  }

  searchMaterial(input: string) {
    for (let i = 0; i < this.materialsDataCount; i++){
      if (input == this.get_materialsData[i].itemId) {
        this.foundMaterial = true;
        this.materialIndex = i;
      }
    }

    if (this.foundMaterial){
      this.viewMaterialName = this.get_materialsData[this.materialIndex].material_name;
      this.viewMaterialPrice = this.get_materialsData[this.materialIndex].price;
      this.foundMaterial = false;
    } else {
      this.viewMaterialName = "";
      this.viewMaterialPrice = 0;
    }
  }

  searchProcess(inputProcess: string) {
    for (let i = 0; i < this.processDataCount; i++){
      if (inputProcess == this.get_processData[i].process) {
        this.processExist = true;
      }
    }
    if (this.processExist) {
      this.write("this already exists, try again!")
      this.processMessage = "Process already exists! Please add a new process!";
      this.processExist = false;
    }
    else{
      this.write("this is a new process, saving");
      this.processMessage = "";
    }
  }

  searchProfile(input: number) {
    for (let i = 0; i < this.materialsDataCount; i++){
      if (input == this.get_materialsData[i].itemId) {
        this.foundProfile = true;
        this.profileIndex = i;
      }
    }

    if (this.foundProfile){
      this.viewProfileName = this.get_materialsData[this.profileIndex].material_name;
      this.viewProfilePrice = this.get_materialsData[this.profileIndex].price;
      this.foundProfile = false;
    } else {
      this.viewProfileName = "";
      this.viewProfilePrice = 0;
    }
  }

  formatAllData(){
    let newMaterial: Materials[];
    let newProfile: Materials[];
    let newProcess: Process[];

    newMaterial = [
      { 
        material_name : this.viewMaterialName,
        price : this.viewMaterialPrice,
        ItemId : this.inputMaterialReferenceNumber,
        description : "MATERIAL"
    }];

    newProfile = [
      {
        material_name : this.viewProfileName,
        price : this.viewProfilePrice,
        ItemId : this.inputProfileReferenceNumber,
        description : "PROFILE"
      }];

    newProcess = [
      {
        process: this.inputProcessName,
        price: this.inputProcessPrice
      }];
  }
}
