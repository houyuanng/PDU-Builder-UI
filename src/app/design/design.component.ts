// this code sucks

import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormControl, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Subscription } from 'rxjs';
import * as _ from "lodash";
import { _countGroupLabelsBeforeOption } from '@angular/material/core';
import { Inserts, Materials, RealImages, SchemImages } from '../Model/logic-models';
import { Content, InsertFormat, QandA, InsertsPerCategory, Material } from '../Model/app-models';
import mergeImages, { ImageSource } from 'merge-images';


@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
 
  constructor(private http: HttpClient) { }
  
  inserts_url = "https://localhost:44387/api/inserts";
  materials_url = "https://localhost:44387/api/materials";
  specs_url = "https://localhost:44387/api/specs";
  realImage_url = "https://localhost:44387/api/realImages";
  schemImage_url = "https://localhost:44387/api/schemImages";

  public get_realImages: RealImages[] = [];
  public get_schemImages: SchemImages[] = []

  public chosenCategory: number = 0;

  public get_insertsData: Inserts[] = [];
  public get_specData: any;
  public inserts_dataCount: number = 0;
  public spec_dataCount: number = 0;
  public categories: any;

  public get_materials: Materials[] = [];

  private subscriptions: Subscription = new Subscription();
  
  folder: string = "/images/Insert real/";
  
  selectedProfile ='something';
  public prevSequence: Sequence[] = [];
  public sequence: Sequence[] = [];
  public profiles: Materials[] = [];
  public chosenProfile: string = "";

  qControls = new FormControl('', Validators.required);
  public questions: string[] = [];
  public answers: string[] = [];

  public pduLen: number = 0;
  public prev_supportPieceLen: number = 0;

  // this needs to be a configurable thing
  public spacer: Sequence = { name: "034-8674 small.jpg", image: "034-8674 small.jpg", length: 12.5}
  public isAutoSpacing: boolean = true;

  public isFreeLength: boolean = true;

  public isTooLong: boolean = false;
  public setPduLen: number = 4400;
  public isInsertPlaceable: boolean = true;

  profileNonEmptyControl = new FormControl('', Validators.required);
  categoryNonEmptyControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  getInserts(chosenCategory: number) : string[] {
    var inserts = this.groupedInserts[chosenCategory]?.inserts ?? [];
    return inserts;
  }

  ngOnInit(): void {
    this.http.get(this.inserts_url).subscribe((data) => 
      {
        this.get_insertsData = data as Inserts[];
        this.inserts_dataCount = Object.keys(data).length;
        this.getCategories(data as Inserts[]);
        this.getInsertsInCategory();
      }, (error: any) => {
        console.error(error);
      });
    
    this.http.get(this.specs_url).subscribe
    (data => {
      this.get_specData = data as SpecListFields[];
      this.spec_dataCount = Object.keys(data).length;
      this.getQuestionsAndAnswers();
      // console.log(this.get_specData);
    }, (error: any) => {
      console.error(error);
    });

    this.http.get(this.realImage_url).subscribe
    (data => {
      this.get_realImages = data as RealImages[];
    }, (error: any) => {
      console.error(error);
    });

    this.http.get(this.schemImage_url).subscribe
    (data => {
      this.get_schemImages = data as SchemImages[];
    }, (error: any) => {
      console.error(error);
    });

    this.http.get(this.materials_url).subscribe
    (data => {
      this.get_materials = data as Materials[];
      this.getProfiles();
      // console.log(this.get_materials);
    }, (error: any) => {
      console.error("ERROR GETTING MATERIALS: \n" + error);
    });
  }

  getProfiles(){
    this.profiles = [];
    for (const material of this.get_materials){
      if (material.description == "PROFILE") {
        this.profiles.push({ itemId: material.itemId, material_name: material.material_name, price: material.price, description: material.description });
      }
    }
  }

  public groupedInserts: InsertsPerCategory[] = [];

  deleteInsert(index: number){
    let buff = this.sequence;
    this.sequence = [];

    this.pduLen = 0;

    for (let i = 0; i < buff.length; i++) {
      if (i != index){
        this.pduLen += buff[i].length;
        this.sequence.push( {
          name: buff[i].name,
          image: buff[i].image,
          length: buff[i].length
        });
      }
    }
    this.prev_supportPieceLen = this.pduLen;
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
    // let questionsAndAnswers: QandA[] = [];
    let answersBuffer: string[] = [];

  }
  trackByFn(index: number, input: string){
    return index;    
  }

  placeSpacers() {
    this.isAutoSpacing = !this.isAutoSpacing;
  }

  toggleLengthConstraint() {
    this.isFreeLength = !this.isFreeLength;
    if (this.isFreeLength){
      this.isTooLong = false;
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

  createImage(pdu: InsertsImages[]) {
    let realImages: ImageSource[] = [];

    let realImageFolder: string = "/images/Insert real/";
    let schemImageFolder: string = "/images/Insert schem/";

    let realImage: string = "";
    let schemImage: string = "";

    let realX_pos: number = 0;
    for (let insert of pdu){
      realImages.push({ src: schemImageFolder + insert.schemImage, x: realX_pos, y: 0 })
      realX_pos += insert.realX;
    }
    console.log(realImages)
    let imageSize: mergeImages.Options;
    imageSize = { width: realX_pos, height: 200 };

    mergeImages(realImages, imageSize).then(b64 => {
      document.getElementById("image")?.setAttribute('src', b64);
      });

    mergeImages(realImages, imageSize).then(b64 => {
      realImage = b64;
      });
  }

  clickSave(){
    let mappedInserts: InsertsImages[] = this.mapImagesToInserts();

    this.prevSequence = Object.assign([], this.sequence);
    let newOrder: NewPdu = new NewPdu;

    let pduImageInfo: InsertsImages[] = [];
    for (let insert of this.prevSequence){
      // for (let mapInsert of mappedInserts)
      //   if (insert.name == mapInsert.insertName){
          // pduImageInfo.push({ 
          //   insertName: mapInsert.insertName, realImage: mapInsert.realImage, realX: mapInsert.realX, realY: mapInsert.realY,
          //   schemImage: mapInsert.realImage, schemX: mapInsert.realX, schemY: mapInsert.schemY });
      // }
      pduImageInfo.push( {
        insertName: insert.name, realImage: "", realX: 0, realY: 0,
        schemImage: "", schemX: 0, schemY: 0 });
    }

    for (let insert of pduImageInfo){
      for (let mapInsert of mappedInserts){
        if ( insert.insertName == mapInsert.insertName ){
          insert.realImage = mapInsert.realImage;
          insert.realX = mapInsert.realX;
          insert.realY = mapInsert.realY;
          insert.schemImage = mapInsert.schemImage;
          insert.schemX = mapInsert.schemX;
          insert.schemY = mapInsert.schemY;
        }
      }
    }

    this.createImage(pduImageInfo);

    newOrder.length = this.pduLen;
    newOrder.profile = this.chosenProfile;
    console.log(newOrder);
    
  }

  mapImagesToInserts() : InsertsImages[]{
    let inserts: InsertsImages[] = [];
    for (let insert of this.get_insertsData){
      inserts.push({ insertName: insert.insert_name, realImage: "", realX: 0, realY: 0, schemImage: "", schemX: 0, schemY: 0 });
    }
    for (let insert of inserts) {
      for (let img of this.get_realImages){
        if (insert.insertName == img.insert_name){
          insert.realImage = img.img_addr;
          insert.realX = img.x_pixel_size;
          insert.realY = img.y_pixel_size;
        }
      }
      for (let img of this.get_schemImages){
        if (insert.insertName == img.insert_name){
          insert.schemImage = img.img_addr;
          insert.schemX = img.x_pixel_size;
          insert.schemY = img.y_pixel_size;
        }
      }
    }
    return inserts;
  }

  clickAddInsert(insert: string, index: number) {
    if (!this.isFreeLength) {
      if ( this.pduLen > this.setPduLen){
        this.isTooLong = true;
      }
    }

    
    if (!this.isTooLong){
      this.sequence.push( {
        name: insert,
        image: insert,
        length: this.get_insertsData[index].length_in_mm
      });

      this.pduLen += this.get_insertsData[index].length_in_mm;

      if (this.isAutoSpacing){
        if (Math.abs(this.prev_supportPieceLen - this.pduLen) >= 1000){
          this.sequence.push(this.spacer);
          this.prev_supportPieceLen = this.pduLen;
        }
      }
    }
  }
  
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

export class NewPdu {
  realImage: string = "";
  schemImage: string = "";
  length: number = 0;
  profile: string = "";
  insertsSpecs: InsertSpecs[] = [];
}

export class InsertSpecs{
  insertName: string = "";
  question: string = "";
  option: string = "";
}

export class InsertsImages{
  insertName: string = "";
  schemImage: string = "";
  schemX: number = 0;
  schemY: number = 0;
  realImage: string = "";
  realX: number = 0;
  realY: number = 0;
}