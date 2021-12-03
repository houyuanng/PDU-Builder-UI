import { Component, OnInit } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropListGroup, moveItemInArray} from '@angular/cdk/drag-drop';
import { FormControl, Validators } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Subscription } from 'rxjs';
import * as _ from "lodash";
import { iteratee, result } from 'lodash';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';
// import { group } from 'console';

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

  public get_insertsData: any;
  public get_specData: any;
  public inserts_dataCount: number = 0;
  public spec_dataCount: number = 0;
  public test: any;
  public categories: any;

  private subscriptions: Subscription = new Subscription();
  
  folder: string = "/images/Insert real/";
  public samples = [
    "032-8666 10 amp small.jpg", 
    "CEM tek.jpg", 
    "C13 lockable.jpg", 
    "053-8642 small.jpg", 
    "012-8701 small.jpg", 
    "22-8673 small.jpg"
  ]

  public sampleInserts: InsertFormat[] = [
    {insertName: "032-8666 10 amp small.jpg", profileConstraint: ["OEC 660"], category: "cat1", question: ["question 1?", "question 2?"], answer: ["answer 1?", "answer 2?", "answer 3?"]},
    {insertName: "CEM tek.jpg", profileConstraint: ["OEC 660", "OEC 670", "OEC 690", "OEC 800"], category: "cat1", question: ["question 1?"], answer: ["answer 2?", "answer 2?", "answer 3?"]},
    {insertName: "C13 lockable.jpg", profileConstraint: ["OEC 660", "OEC 670", "OEC 690", "OEC 800"], category: "cat1", question: ["question 1?", "question 2?"], answer: ["answer 3?", "answer 2?", "answer 3?"]},
    {insertName: "053-8642 small.jpg", profileConstraint: ["OEC 660", "OEC 670", "OEC 690", "OEC 800"], category: "cat1", question: ["question 1?", "question 2?"], answer: ["answer 1?", "answer 2?", "answer 3?"]},
    {insertName: "012-8701 small.jpg", profileConstraint: ["OEC 660"], category: "cat1", question: ["question 1?"], answer: ["answer 2?", "answer 2?", "answer 3?"]},
    {insertName: "22-8673 small.jpg", profileConstraint: ["OEC 660", "OEC 670", "OEC 800"], category: "cat1", question: ["question 1?", "question 2?"], answer: ["answer 3?", "answer 2?", "answer 3?"]}
    ];
  
  public contents: string[] = [];

  selectedProfile ='something';
  chosenProfile: Content = {name: ""};
  public save = false;
  public sequence: string[] = [];
  public profiles: string[] = [];

  qControls = new FormControl('', Validators.required);
  public questions: string[] = [];
  public answers: string[] = [];

  write(data: any){
    this.test = data;
  }

  ngOnInit(): void {
    const getInsertsVal = this.http.get(this.inserts_url).subscribe
    (data => {this.get_insertsData = data;
      this.inserts_dataCount = Object.keys(data).length;
      // this.getQuestionsAndAnswers("049-8642 small2.jpg", data);
      this.getProfiles();
      this.getCategories(data);
      this.getInsertsInCategory();
      this.getFormattedInserts();
    });

    const getSpecsVal = this.http.get(this.specs_url).subscribe
    (data => {this.get_specData = data;
      this.spec_dataCount = Object.keys(data).length;
      this.getQuestionsAndAnswers();

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
    let insertsBuffer: string[] = [];
    let inserts: string[] = [];

    for (let i = 0; i < this.categories.length; i++){
      for (let j = 0; j < this.inserts_dataCount; j++){
        if (this.categories[i] == this.get_insertsData[j].category){
          let newInsert = this.get_insertsData[j].insert_name
          inserts = insertsBuffer.concat(newInsert);
          insertsBuffer = inserts;
        }
      }
      this.groupedInserts[i] = { category: this.categories[i], inserts: inserts}
      inserts = [];
      insertsBuffer = [];

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
    for (let i = 0; i < this.inserts_dataCount; i++) {
      this.allInserts.push({
        insertName: this.get_insertsData[i].insert_name,
        profileConstraint: this.get_insertsData[i].profileConstraint,
        category: this.get_insertsData[i].category,
        question: this.get_insertsData[i].category,
        answer: this.get_insertsData[i].category

      });
    }
  }

  getCategories(data: any) {
    const uniques = data.map(
      (obj: any) => { 
        return obj.category 
      }
    ).filter((item: any, index:any, arr:any) => { 
      return arr.indexOf(item) == index 
    });

    this.categories = uniques;
  }

  selectProfile(){
    // this.chosenProfile = this.profiles.values;
    this.chosenProfile = this.sequence.values;
  }

  blurEvent(event: any) {
    this.chosenProfile = event.target.value;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sequence, event.previousIndex, event.currentIndex);
  }

  clickClear(){
    this.sequence = [];
  }

  clickSave(){
    // this.save = true;
    //  for some reason the tiles can only get in order when they are called individually. calling the whole array does not work :/
    // for (let i = 0; i < this.contents.length; i++){
    //   this.sequence[i] = this.contents[i];
    // }

    this.test = this.sequence[0];
  }

  yes: string = "";
  clickAddInsert(insert: string) {
    this.yes=insert;
    this.sequence.push(insert);
  }

  profileNonEmptyControl = new FormControl('', Validators.required);


  categoryNonEmptyControl = new FormControl('', Validators.required);


  animalControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'one'},
    {name: 'two'},
    {name: 'three'},
    {name: 'four'},
  ];

 
}
interface InsertsPerCategory {
  category: string;
  inserts: string[];
}

interface QandA {
  question: string;
  answers: string[];
}

interface Animal {
  name: string;
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