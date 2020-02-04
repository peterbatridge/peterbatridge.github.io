import {Component, OnInit, ChangeDetectorRef, Input, Output} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseUISignInSuccessWithAuthResult} from 'firebaseui-angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { range } from 'rxjs';

@Component({
  selector: 'controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {
    functions = {};
    stateListIndex = null;
    stateSelection = null;
    states = [];
    functionsList = [];
    selectsList = [];
    colors = {};
    colorSequences = {};
    groupsOfNonagons = {};
    setsOfGroupsOfNonagons = {};
    audioMappings = {};
    directions = [];
    functionSelection = "0";
    db: AngularFirestore;
    cdr: ChangeDetectorRef;
    constructor(cdr: ChangeDetectorRef, db: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) {
        this.db = db;
        this.cdr = cdr;
        db.collection("constants").get().subscribe(docs => {
        docs.forEach(doc => {
            switch(doc.id) {
                case "modes":
                    this.functions = doc.data();
                    this.setupFunctionSelect();
                    break;
                case "colors":
                    this.colors = doc.data();
                    break;
                case "colorSequences":
                    this.colorSequences = doc.data();
                    break;
                case "groupsOfNonagons":
                    this.groupsOfNonagons = doc.data();
                    break;
                case "setsOfGroupsOfNonagons":
                    this.setsOfGroupsOfNonagons = doc.data();
                    break;
                case "audioMappings":
                    this.audioMappings = doc.data();
                    break;
                case "directions":
                    this.directions = doc.data()['directions'];
                    break;
            }
            console.log(doc.id);
        });
    });
    db.collection("state").get().subscribe(docs => {
        docs.forEach(doc => {
            var len = this.states.length;
            this.states.push({
                name: doc.id,
                functions: doc.data().mode,
                args: doc.data().args,
                key: len
            });
        })
        console.log(this.states);
    });
  }


changeMode() {
      var argumentString = "";
      console.log(this.selectsList);
      console.log("change modes");
      for (let i in this.selectsList) {
          if (this.selectsList[i].type == "SELECT") {
              argumentString+=this.selectsList[i].selected+",";
          }
          if (this.selectsList[i].type == "INPUT") {
              argumentString+=this.selectsList[i].selected+",";
          }
      }
      argumentString = "["+argumentString.substr(0, argumentString.length-1)+"]";
      console.log(argumentString);
      this.db.collection("state").doc("current").set({
          args: [argumentString],
          mode: [this.functionSelection]
      }).then(function() {
          console.log("written new state");
      })
      .catch(function(error) {
          console.log("error writing doc:", error);
      });
  }
setupNumberField(arg, selected="") {
    let dropdown = {
        name: arg['name'],
        selected: selected,
        notes: arg['notes'],
        type: 'INPUT',
        options: []
        };
    this.selectsList.push(dropdown);
  }

setupSelectField(arg, options, selected="") {
      let dropdown = {
        name: arg['name'],
        selected: selected,
        notes: arg['notes'],
        type: 'SELECT',
        options: []
        };
        for (let i in options) {
          dropdown.options.push({name: i, value:options[i]})
          if (arg.type == "direction") {
              dropdown.options.push({name: options[i], value:"'"+options[i]+"'"})
          }
        }
    this.selectsList.push(dropdown);
  }

clearArgumentFields() {
      console.log("clearing fields");
      this.selectsList = [];
  }
selectState() {
    this.clearArgumentFields();
    for (let j in this.states[this.stateSelection].functions) {
        var selection = this.functions[this.states[this.stateSelection].functions[j]];
        console.log(selection);
        let args = JSON.parse(this.states[this.stateSelection].args[j]);
        console.log(args);
        for (let i in selection.args) {
            console.log(selection.args[i].type)
            switch(selection.args[i].type) {
                case "number":
                this.setupNumberField(selection.args[i], args[i]);
                break;
                case "color":
                this.setupSelectField(selection.args[i],this.colors, args[i]);
                break;
                case "colorSequence":
                this.setupSelectField(selection.args[i],this.colorSequences,args[i]);
                break;
                case "groupOfNonagons":
                this.setupSelectField(selection.args[i],this.groupsOfNonagons,args[i]);
                break;
                case "setOfGroupsOfNonagons":
                this.setupSelectField(selection.args[i],this.setsOfGroupsOfNonagons,args[i]);
                break;
                case "audioMappings":
                this.setupSelectField(selection.args[i],this.audioMappings,args[i]);
                break;
                case "direction":
                this.setupSelectField(selection.args[i],this.directions,args[i]);
                break;
            }
        }
    }
    console.log(this.selectsList);
}
showArgumentChoices() {
      this.clearArgumentFields();
      var selection = this.functions[this.functionSelection];
      for (let i in selection.args) {
          console.log(selection.args[i].type)
          switch(selection.args[i].type) {
              case "number":
                this.setupNumberField(selection.args[i]);
                break;
              case "color":
                this.setupSelectField(selection.args[i],this.colors);
                break;
              case "colorSequence":
                this.setupSelectField(selection.args[i],this.colorSequences);
                break;
              case "groupOfNonagons":
                this.setupSelectField(selection.args[i],this.groupsOfNonagons);
                break;
              case "setOfGroupsOfNonagons":
                this.setupSelectField(selection.args[i],this.setsOfGroupsOfNonagons);
                break;
              case "audioMappings":
                this.setupSelectField(selection.args[i],this.audioMappings);
                break;
              case "direction":
                this.setupSelectField(selection.args[i],this.directions);
                break;
          }
      }
      console.log(this.selectsList);
  }
setupFunctionSelect() {
      for (let index in this.functions) {
        var f = this.functions[index];
        this.functionsList.push(
            {
                value: index,
                valueName: f.functionName
            }
        );
      }
      console.log(this.functionsList);
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(d => {
        console.log(d);
        if (d == null) {
            this.router.navigateByUrl("");
        }
    });
  }

  logout() {
      console.log("logout? p2");
    this.afAuth.auth.signOut();
  }

  successCallback(data: FirebaseUISignInSuccessWithAuthResult) {
    console.log(data);
  }
}