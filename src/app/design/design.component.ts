import { Component, OnInit } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropListGroup, moveItemInArray} from '@angular/cdk/drag-drop';
import { FormControl, Validators } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Subscription } from 'rxjs';
import * as _ from "lodash";

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
 
  constructor(private http: HttpClient) { }
  inserts_url = "https://localhost:5001/api/inserts";
  public get_insertsData: any;
  public dataCount: number = 0;
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
  
  // {name: "OEC 660"},
  // {name: "OEC 670"},
  // {name: "OEC 690"},
  // {name: "OEC 800"},

  public sampleInserts: InsertStuffs[] = [
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
  // test: string = "";
  public sequence: string[] = [];

  ngOnInit(): void {
    const getProcesVal = this.http.get(this.inserts_url).subscribe
    (data => {this.get_insertsData = data;
      this.dataCount = Object.keys(data).length;
      this.test = _.uniqBy(this.get_insertsData, 'category');
      this.categories = _.uniqBy(this.get_insertsData, 'category');
    });
  }

  groupStuff() {
    this.test = _.uniq(this.get_insertsData)
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
  profiles: Content[] = [
    {name: "OEC660"},
    {name: "OEC670"},
    {name: "OEC690"},
    {name: "OEC800"},
  ];

  categoryNonEmptyControl = new FormControl('', Validators.required);
  // categories: Content[] = [
  //   {name: "cat1"},
  //   {name: "cat2"},
  //   {name: "cat3"},
  //   {name: "cat4"},
  //   {name: "cat5"},
  //   {name: "cat6"},
  //   {name: "cat7"},
  // ]

  qControls = new FormControl('', Validators.required);
  questions: Content[] = [
    {name: "spec1"},
    {name: "spec2"},
    {name: "spec3"},
    {name: "spec4"},
    {name: "spec5"},
    {name: "spec6"},
    {name: "spe87"},
    {name: "spec9"},
    {name: "spec10"}
  ];

  animalControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'one'},
    {name: 'two'},
    {name: 'three'},
    {name: 'four'},
  ];

 
}

interface Category {
  category: string;
}

interface Animal {
  name: string;
}

interface Content {
  name: string;
}

interface InsertStuffs {
  insertName: string;
  profileConstraint: string[];
  category: string;
  question: string[];
  answer: string[];
}