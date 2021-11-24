import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-material',
  templateUrl: './new-material.component.html',
  styleUrls: ['./new-material.component.css']
})
export class NewMaterialComponent implements OnInit {

  constructor() { }

  public inputProcessName: string = "";
  public inputProcessTime: string = "";
  
  public inputProfileReferenceNumber: string = "Profile reference number";
  public viewProfileName: string = "Profile name";
  public viewProfilePrice: string = "Price per centimeter"
  public clickSearchProfile: boolean = false;

  public inputMaterialReferenceNumber: string = "Material reference number";
  public viewMaterialName: string = "Material name";
  public viewMaterialPrice: string = "Price per unit"
  public clickSearchMaterial: boolean = false;

  public clickSave: boolean = false;

  ngOnInit(): void {
  }

  onKeyUp_processName(event: any) {
    this.inputProcessName = event.target.value;
  }

  onKeyUp_processTime(event: any) {
    this.inputProcessTime = event.target.value;
  }

  onKeyUp_profileReferenceNumber(event: any) {
    this.inputProfileReferenceNumber = event.target.value;
  }

  onKeyUp_materialReferenceNumber(event: any) {
    this.inputMaterialReferenceNumber = event.target.value;
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

}
