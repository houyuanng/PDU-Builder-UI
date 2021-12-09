import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { InsertInformation, MaterialForInsert, ProfileConstraint } from '../Model/app-models';

@Component({
  selector: 'app-edit-insert',
  templateUrl: './edit-insert.component.html',
  styleUrls: ['./edit-insert.component.css']
})
export class EditInsertComponent implements OnInit {

  constructor(private http: HttpClient) { }

  public newInsertInput: string = "";
  public currentInsertName: string = "181-BS1363 UK 16 A bleu male small.jpg";

  public get_materialsData: Material[] = [];
  public materials_dataCount: number = 0;

  public get_categoriesData: Category[] = [];
  public categories_dataCount: number = 0;

  public get_processData: Process[] = [];
  public process_dataCount: number = 0;

  public get_insertData: InsertInformation[] = [];
  public insert_dataCount: number = 0;

  public materialUrl = "https://localhost:5001/api/materials";
  public categoriesUrl = "https://localhost:5001/api/categories";
  public processUrl = "https://localhost:5001/api/process";
  public insertUrl = "https://localhost:5001/api/inserts";

  public materialFieldCount: number = 0;
  public processFieldCount: number = 0;
  public processFields: number[] = [];
  public materialFields: number[] = [];

  public profileStates: ProfileConstraint[] = [];


  // these are just set values to show
  public chosenCategory: string= "1";

  public bomInsert: MaterialForInsert[] = [
    {material_name: "material 1", amount: "20"},
    {material_name: "material 2", amount: "10"},
    {material_name: "material 1", amount: "20"},
    {material_name: "material 2", amount: "10"},
    {material_name: "material 1", amount: "20"},
    {material_name: "material 2", amount: "10"}
  ];

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  ngOnInit() {
    // get materials 
    const retMaterialsVal = this.http.get(this.materialUrl).subscribe
    (data => {
      this.get_materialsData = data as Material[];
      this.materials_dataCount = Object.keys(data).length;
    }, (error: any) => {
      console.error(error);
    });

    // get inserts 
    const retInsertVals = this.http.get(this.insertUrl).subscribe
    (data => {
      this.get_insertData = data as InsertInformation[];
      this.insert_dataCount = Object.keys(data).length;
    }, (error: any) => {
      console.error(error);
    });

    // get categories
    const retCatVals = this.http.get(this.categoriesUrl).subscribe
    (data => {
      this.get_categoriesData = data as Category[];
      this.categories_dataCount = Object.keys(data).length;
      // this.write(this.get_categoriesData);
    }, (error: any) => {
      console.error(error);
    });

    // get process
    const retProcessVals = this.http.get(this.processUrl).subscribe
    (data => {
      this.get_processData = data as Process[];
      this.process_dataCount = Object.keys(data).length;
      // this.write(this.get_categoriesData);
    }, (error: any) => {
      console.error(error);
    });

  }

  checkedProfiles(event: any){
    console.log(event);
  }

  public test: any;
  write(data: any) {
    this.test = data;
  }
  
  input_insertName(event: any){
    this.newInsertInput = event.target.value;
    console.log("new name of insert: " + this.newInsertInput);
  }

  parseProfiles() : string[]{
    let profiles: string[] = [];
    for (const materialRow of this.get_materialsData){
        if (materialRow.description == "PROFILE") {
          profiles.push(materialRow.material_name);
      }
    }    
    //this.profilesStates has to always have the same object length as profiles, gotta make it so that it always does somehow
    if (this.profileStates.length !== profiles.length){
      this.profileStates = [];
      for (let i = 0; i < profiles.length; i++){
        this.profileStates.push(new ProfileConstraint);
        if (i == 1){
          this.profileStates[i].selected = true;
        }
      }
    }
    console.log(this.profileStates.length);
    return profiles?? [];
  }

  getProfileConstraints(event: any) {
    console.log(event);
    let allProfiles = this.parseProfiles();
    let unformattedInsertProfiles: string = "";
    let insertProfilesObject: string[] = [];

    for (const row of this.get_insertData){
      if (row.insert_name == this.currentInsertName){
        unformattedInsertProfiles = row.profileConstraint;
      }
    }

    insertProfilesObject = unformattedInsertProfiles.split('-');
    // for (const )
    // if ()
    console.log(insertProfilesObject);
  }

  processes() : Process[]{
    let process: Process[] = [];
    for (const processRow of this.get_processData){
      // console.log(processRow.process);
      // process = processRow.process;
    }
    return process;
  }

  materials() : string[] { //dont even need this :/
    let materials: string[] = [];
    for (const row of this.get_materialsData){
      materials.push(row.material_name);
    }
    // categories = ["0", "1"];
    return materials?? []; //then its just empty so that there is no error

  }

  selectedMaterial(event: string, index: number) {
    // debugger; 

    console.log("value: " + event + " index: " + index);
    let material: string = event;
    // console.log(material);
    let something: MaterialForInsert[] = [];
    this.bomInsert[index] = new MaterialForInsert;
    this.bomInsert[index].material_name = material;
  }

  // add formControl to only input numbers for the amount !!!!!!!!!!!!!!!!!!!!!!!!
  materialAmount(event: any, index: number) {
    let amount: string = event.target.value;
    this.bomInsert[index].amount = amount;
  }

  clickDeleteMaterial(index: number){
    let something = this.bomInsert;
    
    this.bomInsert = [];

    for (let i = 0; i < something.length; i++){
      if (i != index){
        this.bomInsert.push(something[i]);
      }
    }
    console.log(this.bomInsert);
  }

  // clickDeleteMaterial(index: number){
  //   console.log("deleted: " + index + " materialFields: " + this.materialFields);
  //   this.materialFieldCount -= 1;
    
  //   this.materialFields = [];
  //   for (let i = 0; i < this.materialFieldCount; i++) {
  //     if (i != index) {
  //       this.materialFields.push(i);
  //       // delete this.bomInsert[index];
  //     }
  //     else {
  //       console.log("index " + index + " being deleted");
  //     }
  //   }    
  // }

  clickAddMaterial() {
    this.bomInsert.push(new MaterialForInsert)
    // this.materialFields.push(this.materialFieldCount);
    // this.materialFieldCount += 1;
  }

  public processBom: Process[] = [];
  clickAddProcess() {
    this.processBom.push(new Process);

    this.processFields.push(this.processFieldCount);
    this.processFieldCount += 1;
  }

  clickSave() {
    let something = InsertInformation;
    console.log(this.bomInsert);
  }

  selectedprocess(event: any, index: number) {
    console.log("entered");
    console.log(10);

  }
  input_processMinutes(event: any, index: number){
    let minutes = event.target.value;
    this.processBom[index].minutes = minutes;
    console.log(this.processBom);
  }
  
  selectedProfile(event: boolean, index: number, profile: string) {
    this.profileStates[index].selected = event;
    console.log(this.profileStates);
  }

}

class ProfileSelect {
  name: string = "";
  selected: boolean = false;
}

class Material {
  ItemId: string = "";
  material_name: string = "";
  price: number = 0;
  description: string = "";
}

class Category{
  category: string = "";
  thumbnail_addr: string = "";
}

// minutes should change to number when formControl is added
class Process{
  process: string = "";
  minutes: string = "";
}

// class InsertInformation {
//   insert_name: string = "";
//   BOM_per_unit: string = "";
//   length_in_mm: number = 0;
//   category: string = "";
//   specification_txt_addr: string = "";
//   profileConstraint: string = "";
//   positionOnPDU: string = "";
//   technicalConstraint: string = "";
//   processes_file_addr: string = "";
// }