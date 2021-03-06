// material.description for some reason is always empty and idk why

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { materialize } from 'rxjs/operators';
import { Process } from '../Model/app-models';
import { editProcess, EditedMaterial } from '../Model/app-models';


@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent implements OnInit {

  constructor(private http: HttpClient) { }

  url_materialsdb = "https://localhost:5001/api/materials";
  url_process = "https://localhost:5001/api/process"

  public get_materialsData: any = {};
  public materialsDataCount: number = 0;

  public get_processData: any = {};
  public processDataCount: number = 0;

  public stateDeleteProfile: boolean = false;
  public stateDeleteMaterial: boolean = false;
  public stateDeleteProcess: boolean = false;
  public stateChangeProcess: boolean = false;

  public inputSearchProcess: string = "search process";
  public inputSearchMaterial: string = "search material";
  public inputSearchProfile: string = "search profile";
  
  public inputEditProcessName: string = "edit process name";
  public inputEditProcessPrice: number = 0.00;
  public foundProcess: boolean = false;
  public processIndex = 0;

  public viewMaterialName: string = "view material name";
  public viewProfileName: string = "view profile name";
  public viewMaterialPrice: number = 0.00;
  public viewProfilePrice: number = 0.00;
  public foundMaterial: boolean = false;
  public materialIndex = 0;
  public viewProcessName: string = "";
  public viewProcessPrice: number = 0;
  public newProcessName: string = "";
  public newProcessPrice: string = "";

  public viewDesc: any;

  public raw_materialInput: string = "";
  public raw_profileInput: string = "";
  public raw_processInput: string = "";
  public raw_processEditName: string = "";
  public raw_processEditPrice: string = "";

  ngOnInit(): void {
    const getProcesVal = this.http.get(this.url_process).subscribe
    (data => {this.get_processData = data as Process[];
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

  inputEventSearchProcess(event: any) {
    this.raw_processInput = event.target.value;
    this.searchProcess(event.target.value);
  }

  inputEventEditProcessPrice(event: any) {
    this.inputEditProcessPrice = event.target.value;

  }

  inputEventEditProcessName(event: any) {
    this.inputEditProcessName = event.target.value;

  }

  inputEventSearchProfile(event: any) {
    this.inputSearchProfile = event.target.value;
    this.searchProfile(event.target.value);
  }

  inputEventSearchMaterial(event: any) {
    this.inputSearchMaterial = event.target.value;
    this.searchMaterial(event.target.value)
  }

  inputNewProcessName(event: any) {
    this.newProcessName = event.target.value;

  }
  inputNewProcessPrice(event: any){
    this.newProcessPrice = event.target.value;
  }

  clickEventDeleteProfile(event: any){
    this.stateDeleteProfile = true;
    // delete profile request
  }

  clickEventDeleteMaterial(event: any){
    this.stateDeleteMaterial = true;
    // delete material somehow idk
  }
  
  clickDeleteProcess(event: any){
    this.stateDeleteProcess = true;
    // delete process request
  }


  searchProfile(input: string){
    for (let i = 0; i < this.materialsDataCount; i++){
      // for some reason the .description part is always empty and idk why
      // if (input == this.get_materialsData[i].itemId && this.get_materialsData[i].description == "PROFILE") {
      if (input == this.get_materialsData[i].itemId) {
        this.foundMaterial = true;
        this.materialIndex = i;
      }
    }

    if (this.foundMaterial){
      this.viewProfileName = this.get_materialsData[this.materialIndex].material_name;
      this.viewProfilePrice = this.get_materialsData[this.materialIndex].price;
      this.viewDesc = this.get_materialsData[this.materialIndex].description;
      this.foundMaterial = false;
    } else {
      this.viewProfileName = "";
      this.viewProfilePrice = 0;
      this.viewDesc = "none";
    }
  }

  searchProcess(input: string) {
    for (let i = 0; i < this.processDataCount; i++){
      if (input == this.get_processData[i].process) {
        this.foundProcess = true;
        this.processIndex = i;
      }
    }

    if (this.foundProcess){
      this.viewProcessName = this.get_processData[this.processIndex].process;
      this.viewProcessPrice = this.get_processData[this.processIndex].price;
      this.foundProcess = false;
      console.log("found stuff!" + this.viewProcessName);
    } else {
      this.viewProcessName = "";
      this.viewProcessPrice = 0;
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
      console.log(this.viewMaterialPrice);

    } else {
      this.viewMaterialName = "";
      this.viewMaterialPrice = 0;
    }
  }
}

