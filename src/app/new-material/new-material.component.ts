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
  url_process = "https://localhost:5001/api/process";
  url_pushNewMaterials = "https://localhost:5001/api/materials/new";
  url_pushNewProcess = "https://localhost:5001/api/process/new";

  public get_materialsData: any = {};
  public materialsDataCount: number = 0;
  public foundMaterial: boolean = false;
  public materialIndex: number = 0;
  public inputMaterialReferenceNumber: string = "";
  public viewMaterialRef: string = "Material reference number";
  public viewMaterialName: string = "Material name";
  public viewMaterialPrice: number = 0.00;
  public canSaveMaterial: boolean = false;

  public get_processData: any = {};
  public inputProcessName: string = "";
  public inputProcessPrice: number = 0.00;
  public processDataCount: number = 0;
  public processExist: boolean = false;
  public processMessage: string = "";
  public canSaveProcess: boolean = false;
  
  public inputProfileReferenceNumber: string = "";
  public viewProfileRef: string = "Profile reference number";
  public viewProfileName: string = "Profile name";
  public viewProfilePrice: number = 0.00;
  public canSaveProfile: boolean = false;
  public foundProfile: boolean = false;
  public profileIndex: number = 0;  

  public test: any = "";

  ngOnInit(): void {
    this.http.get(this.url_process).subscribe
    (data => {this.get_processData = data;
      this.processDataCount = Object.keys(data).length;
    }, (error: any) => {
      console.log(error);
    });

    const getMaterialsVal = this.http.get(this.url_materialsdb).subscribe
    (data => {this.get_materialsData = data as MasterDatabase[];
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

  clickSave() { // does not push profiles and materials yet because parsing the whole excel is too slow, no way to show progress
    if (this.canSaveMaterial) {
      let material: Materials = this.formatMaterialData();
      // this.pushMaterial(material);
      this.canSaveMaterial = false;
    }
    if (this.canSaveProfile) {
      let profiles: Materials = this.formatProfilesData();
      //this.pushProfile(profiles);
      this.canSaveProfile = false;
    }
    if ((this.inputProcessName != "" && this.canSaveProcess) || (this.canSaveProcess)) {
      let process = this.formatProcessData();
      if (this.inputProcessPrice != 0){
        this.pushProcess(process);

        console.log("tried");

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
      this.viewMaterialRef = input;
      this.foundMaterial = false;
      this.canSaveMaterial = true;
    } else {
      this.viewMaterialName = "Material Name";
      this.viewMaterialPrice = 0.00;
      this.viewMaterialRef = "Material reference number";  
      this.canSaveMaterial = false;
 
    }
  }

  searchProcess(inputProcess: string) {
    for (let i = 0; i < this.processDataCount; i++){
      if (inputProcess == this.get_processData[i].process) {
        this.processExist = true;
        break;
      }
    }
    if (this.processExist) {
      this.processMessage = "Process already exists! Please add a new process!";
      this.canSaveProcess = false;
      this.processExist = false;
    }
    else{ 
      this.canSaveProcess = true;
    }
  }

  searchProfile(input: string) {
    for (let i = 0; i < this.materialsDataCount; i++){
      if (input == this.get_materialsData[i].itemId) {
        this.foundProfile = true;
        this.profileIndex = i;
      }
    }

    if (this.foundProfile){
      this.viewProfileName = this.get_materialsData[this.profileIndex].material_name;
      this.viewProfilePrice = this.get_materialsData[this.profileIndex].price;
      this.viewProfileRef = input;
      this.foundProfile = false;
      this.canSaveProfile = true;
    } else {
      this.viewProfileName = "Profile name";
      this.viewProfilePrice = 0.00;
      this.viewProfileRef = "Profile reference number";
      this.canSaveProfile = false;
    }
  }

  pushMaterial(materials: Materials) {
    this.http.post(this.url_pushNewMaterials, {materials}).subscribe(
      (error: any) => {
      console.log(error);
    });
  }
  pushProfile(profiles: Materials) {
    this.http.post(this.url_pushNewMaterials, {profiles}).subscribe(
      (error: any) => {
      console.log(error);
    });
  }
  pushProcess(process: Process) {
    this.http.post(this.url_pushNewProcess, {process}).subscribe(
      (error: any) => {
      console.log(error);
    });
  }
  

  formatMaterialData() : Materials{
    let newMaterial: Materials;
    newMaterial = 
      { 
        material_name : this.viewMaterialName,
        price : this.viewMaterialPrice,
        itemId : this.inputMaterialReferenceNumber,
        description : "MATERIAL"
    };
    return newMaterial;
  }

  formatProfilesData() : Materials{
    let newProfile: Materials;
    newProfile = 
      {
        material_name : this.viewProfileName,
        price : this.viewProfilePrice,
        itemId : this.inputProfileReferenceNumber,
        description : "PROFILE"
      };
      return newProfile;
  }

  formatProcessData() : Process{
    let newProcess: Process;
    newProcess = 
      {
        process: this.inputProcessName,
        price: this.inputProcessPrice
      };
    return newProcess;
  }
}

export class MasterDatabase{
  itemId: string = "";
  price: number = 0;
  itemName: string = "";
}