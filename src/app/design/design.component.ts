import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormControl, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Subscription } from 'rxjs';
import * as _ from "lodash";
import { _countGroupLabelsBeforeOption } from '@angular/material/core';
import { Inserts } from '../Model/logic-models';
import { Content, InsertFormat, QandA, InsertsPerCategory } from '../Model/app-models';


@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
 
  constructor(private http: HttpClient) { }
  
  inserts_url = "https://localhost:5001/api/inserts";
  specs_url = "https://localhost:5001/api/specs";
  realImage_url = "https://localhost:5001/api/realImages";

  public get_realImages: any;

  public chosenCategory: number = 0;

  public get_insertsData: Inserts[] = [];
  public get_specData: any;
  public inserts_dataCount: number = 0;
  public spec_dataCount: number = 0;
  public categories: any;

  private subscriptions: Subscription = new Subscription();
  
  folder: string = "/images/Insert real/";
  
  selectedProfile ='something';
  chosenProfile: Content = {name: ""};
  public prevSequence: Sequence[] = [];
  public sequence: Sequence[] = [];
  public profiles: string[] = [];

  qControls = new FormControl('', Validators.required);
  public questions: string[] = [];
  public answers: string[] = [];

  public pduLen: number = 0;
  public prev_supportPieceLen: number = 0;

  // this needs to be a configurable thing
  public spacer: Sequence = { name: "034-8674 small.jpg", image: "034-8674 small.jpg", length: 12.5}

  public autoSpacer: boolean = true;

  getInserts(chosenCategory: number) : string[] {
    var inserts = this.groupedInserts[chosenCategory]?.inserts ?? [];
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
        // this.getFormattedInserts();
      }, (error: any) => {
        console.error(error);
      }
    );
    
    const getSpecsVal = this.http.get(this.specs_url).subscribe
    (data => {
      this.get_specData = data as SpecListFields[];
      this.spec_dataCount = Object.keys(data).length;
      this.getQuestionsAndAnswers();
      // console.log(this.get_specData);
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

  deleteInsert(index: number){
    let buff = this.sequence;
    this.sequence = [];
    for (let i = 0; i < buff.length; i++) {
      if (i != index){
        this.sequence.push( {
          name: buff[i].name,
          image: buff[i].image,
          length: buff[i].length
        });
      }
    }
  }

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

  public QA: QandA[] = [];
  // this dont work because idk how to send requests to ask for a specific one
  getQuestionsAndAnswers(){

    let answers: string[] = [];

    for (let question of this.get_specData){
      answers = question.options?.split('`');
      this.QA.push({ question: question.question, answers: answers});
    }

    console.log(this.QA[0].answers[0]);

    // let questionsAndAnswers: QandA[] = [];
    let answersBuffer: string[] = [];

  }

  // public allInserts: InsertFormat[] = [];
  // getFormattedInserts() {
  //   for (const insert of this.get_insertsData) {
  //     this.allInserts.push({
  //       insertName: insert.insert_name,
  //       profileConstraint: [insert.profileConstraint],
  //       category: insert.category,
  //       question: [insert.category],
  //       answer: [insert.category]
  //     });
  //   }
  // }

  trackByFn(index: number, input: string){
    return index;    
  }

  placeSpacers() {
    this.autoSpacer = !this.autoSpacer;
    console.log("changed");

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
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // } else {
    //   transferArrayItem(
    //     event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex,
    //   );
    // }
  }

  clickClear(){
    this.sequence = [];
    this.pduLen = 0;
    this.prev_supportPieceLen = 0;
  }

  clickSave(){
    this.prevSequence = Object.assign([], this.sequence);
  }

  getInsertImage(insert: string) {
    for (let row in this.get_insertsData){

    }
  }

  clickAddInsert(insert: string, index: number) {
    this.sequence.push( {
      name: insert,
      image: insert,
      length: this.get_insertsData[index].length_in_mm
    });

    this.pduLen += this.get_insertsData[index].length_in_mm;

    if (this.autoSpacer){
      if (Math.abs(this.prev_supportPieceLen - this.pduLen) >= 1000){
        this.sequence.push(this.spacer);
        this.prev_supportPieceLen = this.pduLen;
      }
    }
  }

  profileNonEmptyControl = new FormControl('', Validators.required);
  categoryNonEmptyControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  
}

export class Sequence{
  name: string = "";
  image: string = "";
  length: number = 0;
}

export class SpecListFields{
  question: string = "";
  options: string = "";
}