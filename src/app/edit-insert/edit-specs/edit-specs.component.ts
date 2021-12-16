import { Component, OnInit } from '@angular/core';
import { QandA } from 'src/app/Model/app-models';

@Component({
  selector: 'app-edit-specs',
  templateUrl: './edit-specs.component.html',
  styleUrls: ['./edit-specs.component.css']
})
export class EditSpecsComponent implements OnInit {

  constructor() { }

  public QA: QandA[] = [];
  public question: string = "";
  public answers: string[] = [];

  ngOnInit(): void {
    this.clearOptions();
  }

  clearOptions() {
    this.QA.push( new QandA );
    this.QA[0].question = ("");
    this.QA[0].answers.push("");
  }

  // adds new question, adds an empty string to `answers`
  clickNewQuestion() {
    this.QA.push(new QandA);
    let len = this.QA.length;
    this.QA[len-1].answers.push("");
  }

  clickNewAnswer(index: number) {
    this.QA[index].answers.push( "" );
    this.answers.push("");
  }

  clickDeleteQuestion(index: number) {
    let buff = this.QA;

    this.QA = []; 

    if (buff.length > 1){
      for (let i = 0; i < buff.length; i++){
        if (i != index) {
          this.QA.push(buff[i]);
        }
      }
    }
    else{
      this.clearOptions();
    }
    console.log(this.QA);
  }
  
  clickDeleteAnswer(qIndex: number, aIndex: number) {
    let buff = this.QA[qIndex].answers
    
    this.QA[qIndex].answers = [];

    if (buff.length > 1){
      for (let i = 0; i < buff.length; i++){
        if (i != aIndex) {
          this.QA[qIndex].answers.push(buff[i]);
        }
      }
    }
    else {
      this.QA[qIndex].answers.push( "" );
    }
  }

  public counter: number = 0;
  trackByAnswer(questionIndex: number, input: string) {
    return questionIndex;

    // let input = answer.target.value;

    // this.answers[answerIndex] = input;
    // // this.QA[questionIndex].answers[answerIndex] = input;
    // console.log("input: " + input + " question index: " + questionIndex + " answer index: " + answerIndex);
    // console.log(this.QA);
  }

  save(){
    console.log(this.QA);
  }

}
