import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { UrlTree } from '@angular/router';
import mergeImages, { ImageSource } from 'merge-images';
import { __values } from 'tslib';
import { Orders, Materials } from '../Model/logic-models';
import { Material } from '../Model/app-models';

@Component({
  selector: 'app-greeter',
  templateUrl: './greeter.component.html',
  styleUrls: ['./greeter.component.css']
})
export class GreeterComponent {

  constructor(private http: HttpClient) { }

  private subscriptions: Subscription = new Subscription();
  public response: {} = {};
  public retPostData: any;
  public retGetData: any;
  public matData: any;
  public test: any;

  public PostData() {
    // const url = "http://localhost:49528/api/Home";
    const url = "https://localhost:44387/api/greeter";

    let mockData: Materials[] = [
      { material_name: "material Name1 sfpwjf", price: 0, itemId: "f32rrdffjr", description: "matewrgval" },
      { material_name: "material Name2 sfpwjf", price: 20, itemId: "fkoiwefjr", description: "mateiral" }];

    const retVal = this.http.post(url, {mockData}).subscribe
    (data => {this.retPostData = data;
      console.log(data);
    },  (error: any) => {
      console.error(error);
    });
  }

  public ngOnInit() {
    this.PostData();

    // let images: ImageSource[] = [];
    // images = [{ src: "/images/Insert real/012-8701 small.jpg", x: 0, y: 0 },
    //           { src: "/images/Insert real/032-8666 10 amp small.jpg", x: 60, y: 0 },
    //           { src: "/images/Insert real/012-8701 small.jpg",  x: 100, y: 0 }
    // ];
    // let imageSize: mergeImages.Options;
    // imageSize = { width: 128 ,height: 200 };

    // let stringImage: string = "";
    // let something = mergeImages(images, imageSize).then(b64 => {
    //   document.getElementById("image")?.setAttribute('src', b64);
    //   console.log(b64.replace(/^data:image\/[a-z]+;base64,/, ""));
    //   });  




  }

  errorGenerateImage(error: any) : any{
    console.error("error with generating image: " + error);
    return;
  }

//   dataURLtoFile(dataurl: string, filename: string) {
 
//     var arr = dataurl.split(','),
//         mime = arr[0].match(/:(.*?);/)[1],
//         bstr = atob(arr[1]), 
//         n = bstr.length, 
//         u8arr = new Uint8Array(n);
        
//     while(n--){
//         u8arr[n] = bstr.charCodeAt(n);
//     }
    
//     return new File([u8arr], filename, {type:mime});
// }
}

class Sources {
  imageLocation: string = "";
  xTranslate: number = 0;
  yTranslate: number = 0;
}