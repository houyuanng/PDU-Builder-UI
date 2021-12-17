import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { materialize } from 'rxjs/operators';
import { InsertInformation, MaterialForInsert, Material, Category, Process, ProfileConstraint } from '../Model/app-models';
import { timeStamp } from 'console';
import { Materials } from '../Model/logic-models';

@Component({
  selector: 'app-new-insert',
  templateUrl: './new-insert.component.html',
  styleUrls: ['./new-insert.component.css']
})
export class NewInsertComponent implements OnInit {

  constructor(private http: HttpClient, private _formBuilder: FormBuilder) { }

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
  public materialFields: number[] = [];

  public chosenCategory: string= "";

  public profileStates: ProfileConstraint[] = [];

  materialControl = new FormControl();

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

    this.bomInsert.push( new BOMfields );
    this.processBom.push( new Process );
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

    //this.profilesStates has to always have the same object length as profiles, gotta make it so that it always does somehow
    if (this.profileStates.length !== profiles.length){
      this.profileStates = [];
      for (let i = 0; i < profiles.length; i++){
        this.profileStates.push(new ProfileConstraint);
      }
    }
    return profiles?? [];
  }

  public bomInsert: BOMfields[] = [];

  // add formControl to only input numbers for the amount !!!!!!!!!!!!!!!!!!!!!!!!

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
   
  clickAddMaterial() {
    this.bomInsert.push(new BOMfields)
    // this.materialFields.push(this.materialFieldCount);
    // this.materialFieldCount += 1;
  }

  public processBom: Process[] = [];
  clickAddProcess() {
    this.processBom.push(new Process);
    // this.processBom[0].process
  }

  clickSave() {
    console.log(this.bomInsert);
    console.log(this.processBom);
  }

  selectedProfile(event: boolean, index: number, profile: string) {
    this.profileStates[index].selected = event;
    console.log(this.profileStates);
  }

  selectedProcess(event: any, index: number) {
    console.log("entered");
  }

  input_processMinutes(event: any, index: number){
    let minutes = event.target.value;
    this.processBom[index].minutes = minutes;
    console.log(this.processBom);
  }

  trackByFn(index: number, input: string) {
    return index;
  }
}

export class BOMfields {
  itemId: string = "";
  name: string = "";
  amount: number = 0;
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};