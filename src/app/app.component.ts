import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  Loadedfeature='recipe';
 
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyAix4twiNsYOWUyAeFu2NIzsWWrPCgD7aA",
      authDomain: "my-recipe-book-89822.firebaseapp.com"
    });
  }
  onFeatureSelected(feature:string)
  {
  this.Loadedfeature=feature;
  console.log(feature);  }


}
