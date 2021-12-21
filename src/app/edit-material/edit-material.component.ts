// material.description for some reason is always empty and idk why

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { materialize } from 'rxjs/operators';
import { Material, Process } from '../Model/app-models';
import { editProcess, EditedMaterial } from '../Model/app-models';
import { Materials } from '../Model/logic-models';


@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent implements OnInit {

  constructor(private http: HttpClient) { }

  url_materialsdb = "https://localhost:5001/api/materials";
  url_process = "https://localhost:5001/api/process";
  url_editMaterial = "https://localhost:5001/api/materials/edit";

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
  
  public editProcessName: string = "edit process name";
  public editProcessPrice: number = 0.00;
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

  public viewDesc: any;

  public profiles: Materials[] = [];
  public materials: Materials[] = [];

  ngOnInit(): void {
    const getProcesVal = this.http.get(this.url_process).subscribe
    (data => {this.get_processData = data as Process[];
    }, (error: any) => {
      console.log(error);
    });

    this.http.get(this.url_materialsdb).subscribe
    (data => {
      this.get_materialsData = data as Materials[];
      this.materials = this.parseMaterials(this.get_materialsData);
      this.profiles = this.parseProfiles(this.get_materialsData);
    }, (error: any) => {
      console.log(error);
    });
  }

  parseProfiles(rawMaterials: Materials[]) : Materials[]{
    let profiles: Materials[] = [];
    for (let material of rawMaterials){
      if (material.description == "PROFILE"){
        profiles.push({ itemId: material.itemId, material_name: material.material_name, price: material.price, description: material.description });
      }
    }
    return profiles;
  }
  parseMaterials(rawMaterials: Materials[]) : Materials[]{
    let materials: Materials[] = [];
    for (let material of rawMaterials){
      if (material.description == "MATERIAL"){
        materials.push({ itemId: material.itemId, material_name: material.material_name, price: material.price, description: material.description });
      }
    }
    return materials;
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

