import { Component, Input, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { materialize } from 'rxjs/operators';
import { InsertInformation, MaterialForInsert, Material, Category, InsertProcess, ProfileConstraint } from '../Model/app-models';
import { timeStamp } from 'console';
import { Materials } from '../Model/logic-models';
import { SpecListFields } from '../design/design.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-new-insert',
  templateUrl: './new-insert.component.html',
  styleUrls: ['./new-insert.component.css']
})
export class NewInsertComponent implements OnInit {
  

  constructor(private http: HttpClient, private router: Router) { }

  favoriteSeason: string | undefined;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  newInsertInput: string | undefined;

  public get_materialsData: Material[] = [];
  public materials_dataCount: number = 0;

  public get_categoriesData: Category[] = [];
  public categories_dataCount: number = 0;

  public get_processData: InsertProcess[] = [];
  public process_dataCount: number = 0;

  public materialUrl = "https://localhost:44387/api/materials";
  public categoriesUrl = "https://localhost:44387/api/categories";
  public processUrl = "https://localhost:44387/api/process";

  public insertProcessUrl = "https://localhost:44387/api/insertprocess/new";

  public materialFieldCount: number = 0;
  public materialFields: number[] = [];

  public profileStates: ProfileConstraint[] = [];

  public NewInsert: NewInsert = new NewInsert;

  materialControl = new FormControl();

  ngOnInit() {
    // get materials 
    this.http.get(this.materialUrl).subscribe
    (data => {
      this.get_materialsData = data as Material[];
      this.materials_dataCount = Object.keys(data).length;
    }, (error: any) => {
      console.error(error);
    });

    // get categories
    this.http.get(this.categoriesUrl).subscribe
    (data => {
      this.get_categoriesData = data as Category[];
      this.categories_dataCount = Object.keys(data).length;
      // this.write(this.get_categoriesData);
    }, (error: any) => {
      console.error(error);
    });

    // get categories
    this.http.get(this.processUrl).subscribe
    (data => {
      this.get_processData = data as InsertProcess[];
      this.process_dataCount = Object.keys(data).length;
      // this.write(this.get_categoriesData);
    }, (error: any) => {
      console.error(error);
    });

    this.processBom.push( new InsertProcess );

    this.NewInsert.bom.push( new BOMfields );
    this.NewInsert.processes.push( new InsertProcess );
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

  // add formControl to only input numbers for the amount !!!!!!!!!!!!!!!!!!!!!!!!
  clickDeleteMaterial(index: number){
    let holder = this.NewInsert.bom;
    this.NewInsert.bom = [];

    for (let i = 0; i < holder.length; i++){
      if (i != index){
        this.NewInsert.bom.push(holder[i]);
      }
    }
  }
  
  clickDeleteProcess(index: number) {
    let holder = this.NewInsert.processes;
    this.NewInsert.processes = [];

    for (let i = 0; i < holder.length; i++){
      if (i != index){
        this.NewInsert.processes.push(holder[i]);
      }
    }
  }

  clickAddMaterial() {
    this.NewInsert.bom.push( new BOMfields );
    // this.materialFields.push(this.materialFieldCount);
    // this.materialFieldCount += 1;
  }

  public processBom: InsertProcess[] = [];
  clickAddProcess() {
    this.NewInsert.processes.push(new InsertProcess);
    this.processBom.push(new InsertProcess);
    // this.processBom[0].process
  }

  clickSave() {
    let output = this.NewInsert;
    this.http.post(this.insertProcessUrl, output).subscribe
    (data => { }, (error: any) => {
      console.error(error);
    });

    console.log(this.NewInsert);
  }

  selectedProfile(event: boolean, index: number, profile: string) {
    this.profileStates[index].selected = event;
    this.profileStates[index].profile = profile;

    let profileString: string = "";

    for (let profile of this.profileStates){
      if (profile.selected){
        if (profileString != ""){
          profileString += "-" + profile.profile;
        }
        else {
          profileString += profile.profile;
        }
      }
    }
    
    this.NewInsert.profileConstraint = profileString;

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

export class NewInsert {
  insertName: string = "";
  length: number = 0
  category: string = "";
  profileConstraint: string = "";
  processes: InsertProcess[] = [];
  specs: SpecListFields[] = [];
  bom: BOMfields[] = [];
  positionOnPdu: string = "";
  realImage: string = "";
  schemImage: string = "";

}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

