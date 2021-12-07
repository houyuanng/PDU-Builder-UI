import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { FormControl, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Subscription } from 'rxjs';
import * as _ from "lodash";
import { _countGroupLabelsBeforeOption } from '@angular/material/core';
// import { group } from 'console';

class Inserts {
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

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
 
  constructor(private http: HttpClient) { }
  
  inserts_url = "https://localhost:5001/api/inserts";
  specs_url = "https://localhost:5001/api/specs";

  public chosenCategory: number = 0;

  public get_insertsData: Inserts[] = [];
  public get_specData: any;
  public inserts_dataCount: number = 0;
  public spec_dataCount: number = 0;
  public test: string[] = [];
  public categories: any;

  private subscriptions: Subscription = new Subscription();
  
  folder: string = "/images/Insert real/";
  
  selectedProfile ='something';
  chosenProfile: Content = {name: ""};
  public prevSequence: string[] = [];
  public sequence: string[] = [];
  public profiles: string[] = [];

  qControls = new FormControl('', Validators.required);
  public questions: string[] = [];
  public answers: string[] = [];

  write(data: any){
    this.test = data;
  }

  getInserts(chosenCategory: number) : string[] {
    console.log("called getInserts with: " + chosenCategory);
    var inserts = this.groupedInserts[chosenCategory]?.inserts ?? [];
    console.warn(inserts);
    return inserts;
  }

  ngOnInit(): void {
    const getInsertsVal = this.http.get(this.inserts_url)
    .subscribe((data) => 
      {
        this.get_insertsData = data as Inserts[];
        this.inserts_dataCount = Object.keys(data).length;
        // this.getQuestionsAndAnswers("049-8642 small2.jpg", data);
        this.getProfiles();
        this.getCategories(data as Inserts[]);
        this.getInsertsInCategory();
        this.getFormattedInserts();
      }, (error: any) => {
        console.error(error);
      }
    );
    
    const getSpecsVal = this.http.get(this.specs_url).subscribe
    (data => {
      this.get_specData = data;
      this.spec_dataCount = Object.keys(data).length;
      this.getQuestionsAndAnswers();
    }, (error: any) => {
      console.error(error);
    });
  }


  getProfiles() {
    let profileString: string = "";
    for (let i = 0; i < this.inserts_dataCount; i++){
      profileString += this.get_insertsData[i].profileConstraint;
      profileString += "-";

      if (i == this.inserts_dataCount-1){
        profileString += this.get_insertsData[i].profileConstraint;
      }
    }

    let profileObj: string[] = [];
    profileObj = profileString.split("-");

    let distinctProfiles = _.uniq(profileObj);

    this.profiles = distinctProfiles;
  }

  public something: any;
  public groupedInserts: InsertsPerCategory[] = [];

  getInsertsInCategory()  {  
    for(const category of this.categories) {
      let inserts: string[] = [];
      for(const insert of this.get_insertsData) {
        if(insert.category == category)
        inserts.push(insert.insert_name);
      }
      this.groupedInserts.push({ category: category, inserts: inserts} as InsertsPerCategory);
    }
  }

  public questionsAndAnswers: QandA[] = [];

  // this dont work because idk how to send requests to ask for a specific one
  getQuestionsAndAnswers() {
    // let questionsAndAnswers: QandA[] = [];
    let answersBuffer: string[] = [];
    let answers: string[] = [];

    // for (let i = 0; i < this.spec_dataCount; i++){
    //   if (this.get_specData[i].insert_name == insert){
    //     let holder = this.get_specData[i].options;
    //     answers = answersBuffer.concat(holder);

    //     questionsAndAnswers[i] = ({ question: this.get_specData[i].options, answers: answers});
    //     answersBuffer = answers;

    //     // this.answers[i] = this.get_specData[i].options;
    //     // this.questions[i] = this.get_specData[i].question;
    //   }
    // }

    for (let i = 0; i < this.spec_dataCount; i++) {
      this.questionsAndAnswers[i] = { question: this.get_specData[i].question, answers: this.get_specData[i].options}
      

      this.answers[i] = this.get_specData[i].options;
      this.questions[i] = this.get_specData[i].question;
    }
  }

  public allInserts: InsertFormat[] = [];
  getFormattedInserts() {
    for (const insert of this.get_insertsData) {
      this.allInserts.push({
        insertName: insert.insert_name,
        profileConstraint: [insert.profileConstraint],
        category: insert.category,
        question: [insert.category],
        answer: [insert.category]
      });
    }
  }

  getCategories(inserts: Inserts[]) {
    const uniques = inserts.map(
      (insert: Inserts) => { 
        return insert.category 
      }
    ).filter((item: string, index: number, arr: string[]) => { 
      return arr.indexOf(item) == index 
    });

    this.categories = uniques;
  }

  selectProfile(){
    // this.chosenProfile = this.profiles.values;
    // this.chosenProfile = this.sequence.values;
  }

  blurEvent(event: any) {
    this.chosenProfile.name = event.target.value as string;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sequence, event.previousIndex, event.currentIndex);
  }

  clickClear(){
    this.sequence = [];
  }

  clickSave(){
    this.prevSequence = Object.assign([], this.sequence);
    this.write(this.prevSequence);
  
  }

  clickAddInsert(insert: string) {
    this.sequence.push(insert);
  }

  profileNonEmptyControl = new FormControl('', Validators.required);
  categoryNonEmptyControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  
}

interface InsertsPerCategory {
  category: string;
  inserts: string[];
}

interface QandA {
  question: string;
  answers: string[];
}

interface Content {
  name: string;
}

interface InsertFormat {
  insertName: string;
  profileConstraint: string[];
  category: string;
  question: string[];
  answer: string[];
}

  // categories: Content[] = [
  //   {name: "cat1"},
  //   {name: "cat2"},
  //   {name: "cat3"},
  //   {name: "cat4"},
  //   {name: "cat5"},
  //   {name: "cat6"},
  //   {name: "cat7"},
  // ]
  // profiles: Content[] = [
  //   {name: "OEC660"},
  //   {name: "OEC670"},
  //   {name: "OEC690"},
  //   {name: "OEC800"},
  // ];