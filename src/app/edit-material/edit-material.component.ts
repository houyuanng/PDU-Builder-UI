// material.description for some reason is always empty and idk why

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { materialize } from 'rxjs/operators';
import { Material, InsertProcess } from '../Model/app-models';
import { editProcess, EditedMaterial } from '../Model/app-models';
import { Materials, Process } from '../Model/logic-models';


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
  url_editProcess = "https://localhost:5001/api/process/edit";

  url_deleteMaterial = "https://localhost:5001/api/materials/delete";
  url_deleteProcess = "https://localhost:5001/api/process/delete";

  public get_materialsData: Materials[] = []
  public materialsDataCount: number = 0;

  public get_processData: Process[] = [];
  public processDataCount: number = 0;

  public stateDeleteProfile: boolean = false;
  public stateDeleteMaterial: boolean = false;
  public stateDeleteProcess: boolean = false;
  public stateChangeProcess: boolean = false;

  public inputSearchProcess: string = "";
  public inputSearchMaterial: string = "";
  public inputSearchProfile: string = "";
  
  public editProcessName: string = "";
  public editProcessPrice: number = 0.00;
  public foundProcess: boolean = false;
  public foundProfile: boolean = false;

  public materialReferenceNumber: string = "";
  public profileReferenceNumber: string = "";

  public canDeleteProfile: boolean = false;
  public canDeleteMaterial: boolean = false;
  public canUpdateProcess: boolean = false;

  public viewMaterialName: string = "view material name";
  public viewProfileName: string = "view profile name";
  public viewMaterialPrice: number = 0.00;
  public viewProfilePrice: number = 0.00;
  public foundMaterial: boolean = false;
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

  pushProcess(search: string, newItem: Process) {
    this.http.post(this.url_editProcess, {search, newItem}).subscribe
    ((error: any) => {
      console.log(error);
    });
  }

  formatProcess() {
    let process: Process = new Process;
    process.process = this.editProcessName;
    process.price = this.editProcessPrice;
    return process;
  }

  clickSave() {
    if (this.editProcessName != "" && this.inputSearchProcess != ""){
      let newProcess = this.formatProcess();
      this.pushProcess(this.inputSearchProcess, newProcess)
    }
  }

  clickEventDeleteProfile(){
    let search: string = this.profileReferenceNumber;
    let materialType: string = "PROFILE";
    this.http.post(this.url_deleteMaterial, {search, materialType}).subscribe
    (() => { this.canDeleteProfile = false; }, 
    (error: any) => {
      console.log(error);
  });
    // delete profile request
  }

  clickEventDeleteMaterial(){
    // let search: string = this.materialReferenceNumber;
    let search: string = this.materialReferenceNumber;
    let materialType: string = "MATERIAL";
    this.http.post(this.url_deleteMaterial, {search, materialType}).subscribe
    ((data: any) => { this.canDeleteMaterial = false; }, 
    (error: any) => {
      console.log(error);
  });
        // delete material somehow idk
  }
  
  clickDeleteProcess(){

    console.log("gong to delete")

    let search: string = this.inputSearchProcess;
    this.http.post(this.url_deleteProcess, {search}).subscribe
      ((data: any) => { this.canUpdateProcess = false; }, 
      (error: any) => {
        console.log(error);
    });


    // delete process request
  }


  searchProfile(event: any){
    let input: string = event.target.value;
    
    let name: string = "";
    let price: number = 0;
    let descr: string = "";

    for (let profile of this.profiles){
      console.log(profile);
      if (input == profile.itemId) {
        console.log("found!");
        this.foundProfile = true;
        // this.materialIndex = i;
        name = profile.material_name;
        price = profile.price;
        descr = profile.description;
      }
    }

    if (this.foundProfile){
      this.profileReferenceNumber = input
      this.viewProfileName = name;
      this.viewProfilePrice = price;
      this.viewDesc = descr;
      this.foundProfile = false;
      this.canDeleteProfile = true;
    } else {
      this.profileReferenceNumber = "";
      this.viewProfileName = "";
      this.viewProfilePrice = 0;
      this.viewDesc = "none";
    }
  }

  searchProcess(input: string) {
    // let input: string = this.inputSearchProcess;
    console.log(input);

    let viewProcess : string = "";
    let viewPrice : number = 0;

    for (let process of this.get_processData){
      if (input == process.process) {
        this.foundProcess = true;
        viewProcess = process.process;
        viewPrice = process.price;
        }
      }
    
    if (this.foundProcess){
      this.viewProcessName = viewProcess;
      this.viewProcessPrice = viewPrice;
      this.profileReferenceNumber = input;
      this.foundProcess = false;
      console.log("found stuff!" + this.viewProcessPrice);
    } else {
      this.viewProcessName = "";
      this.viewProcessPrice = 0;
    }
  }

  searchMaterial(event: any) {
    let input: string = event.target.value;
    
    let name: string = "";
    let price: number = 0;
    let descr: string = "";

    for (let material of this.materials){
      if (input == material.itemId) {
        this.foundMaterial = true;
        name = material.material_name;
        price = material.price;
        descr = material.description;
      }
    }
    if (this.foundMaterial){
      this.materialReferenceNumber = input;
      this.viewMaterialName = name;
      this.viewMaterialPrice = price;
      this.foundMaterial = false;  
      this.canDeleteMaterial = true;
    } else {
      this.materialReferenceNumber = "";
      this.viewMaterialName = "";
      this.viewMaterialPrice = 0;
    }
  }
}

