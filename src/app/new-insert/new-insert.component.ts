import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { materialize } from 'rxjs/operators';

@Component({
  selector: 'app-new-insert',
  templateUrl: './new-insert.component.html',
  styleUrls: ['./new-insert.component.css']
})
export class NewInsertComponent implements OnInit {

  constructor(private http: HttpClient) { }
  options: string[] = ['One', 'Two', 'Three'];

  favoriteSeason: string | undefined;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  newInsertInput: string | undefined;

  public get_materialsData: Material[] = [];
  public materials_dataCount: number = 0;

  public get_categoriesData: Category[] = [];
  public categories_dataCount: number = 0;

  public get_processData: Process[] = [];
  public process_dataCount: number = 0;

  public materialUrl = "https://localhost:5001/api/materials";
  public categoriesUrl = "https://localhost:5001/api/categories";
  public processUrl = "https://localhost:5001/api/process";

  public materialFieldCount: number = 0;
  public processFieldCount: number = 0;
  public processFields: number[] = [];
  public materialFields: number[] = [];

  public chosenCategory: string= "";

  ngOnInit() {
    // get materials 
    const retMaterialsVal = this.http.get(this.materialUrl).subscribe
    (data => {
      this.get_materialsData = data as Material[];
      this.materials_dataCount = Object.keys(data).length;
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

    // get categories
    const retProcessVals = this.http.get(this.processUrl).subscribe
    (data => {
      this.get_processData = data as Process[];
      this.process_dataCount = Object.keys(data).length;
      // this.write(this.get_categoriesData);
    }, (error: any) => {
      console.error(error);
    });

  }

  public test: any;
  write(data: any) {
    this.test = data;
  }
  
  input_insertName(event: any){
    this.newInsertInput = event.target.value;
    this.write(event.target.value);
  }

  parseProfiles() : string[]{
    let profiles: string[] = [];
    for (const materialRow of this.get_materialsData){
        if (materialRow.description == "PROFILE") {
          profiles.push(materialRow.material_name);
      }
    }
    return profiles?? [];
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

  public bomInsert: MaterialForInsert[] = [];
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
}

interface Profile {
  NAME: string;
  PRICE: number;
  REFERENCE_ID: string;
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

class InsertInformation {
  insert_name: string = "";
  BOM_per_unit: string = "";
  length_in_mm: number = 0;
  category: string = "";
  specification_txt_addr: string = "";
  profileConstraint: string = "";
  positionOnPDU: string = "";
  technicalConstraint: string = "";
  processes_file_addr: string = "";
}

class MaterialForInsert {
  material_name: string = "";
  amount: string = "";
}
