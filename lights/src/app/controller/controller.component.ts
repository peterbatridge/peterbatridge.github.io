import {Component, OnInit, ChangeDetectorRef, Input, Output} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseUISignInSuccessWithAuthResult} from 'firebaseui-angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { range } from 'rxjs';
import { stringify } from 'querystring';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { DeleteDialog }from './delete-dialog.component';
@Component({
  selector: 'controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {
    functions = {};
    saveAs = "";
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
    gifs = {};
    directions = [];
    functionSelection = "0";
    db: AngularFirestore;
    cdr: ChangeDetectorRef;
    constructor(private dialog: MatDialog, cdr: ChangeDetectorRef, db: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) {
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
                case "gifs":
                    this.gifs = doc.data();
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

saveModeAs(doc = null) {

  var argumentString = "";
  console.log(this.selectsList);
  console.log("change modes");
  let funList = [];
  let argList = [];
  for (let i in this.selectsList) {
    if (this.selectsList[i].type == "FUNCTION") {
      funList.push(this.selectsList[i].selected);
      if (parseInt(i)!=0) {
        argumentString = "["+argumentString.substr(0, argumentString.length-1)+"]";
        console.log(argumentString);
        argList.push(argumentString);
        argumentString = "";
      }
    }
    if (this.selectsList[i].type == "SELECT") {
      argumentString+=this.selectsList[i].selected+",";
    }
    if (this.selectsList[i].type == "INPUT") {
      argumentString+=this.selectsList[i].selected+",";
    }
  }
  argumentString = "["+argumentString.substr(0, argumentString.length-1)+"]";
  argList.push(argumentString);
  console.log(argumentString);
  let saveAs = this.saveAs;
  if (doc!=null) {
    saveAs = doc;
  }
  console.log(this.stateSelection);
  console.log(this.saveAs);
  this.db.collection("state").doc(saveAs).set({
      args: argList,
      mode: funList
  }).then(() => {
      console.log("written new state");
      this.resetModes(saveAs);
  })
  .catch(function(error) {
      console.log("error writing doc:", error);
  });
}

resetModes(selected) {
  this.db.collection("state").get().subscribe(docs => {
    this.states = [];
    let i = 0;
    docs.forEach(doc => {
        var len = this.states.length;
        this.states.push({
            name: doc.id,
            functions: doc.data().mode,
            args: doc.data().args,
            key: len
        });
        if (doc.id == selected) {
          this.stateSelection = i;
        }
        i++;
    })
  });
}

changeMode() {
  this.saveModeAs("current");
}

openDeleteDialog() {
  console.log(this.saveAs);
  if (this.saveAs!="current" && this.saveAs!=""){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DeleteDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.saveAs!="current" && this.saveAs!=""){
        this.db.collection("state").doc(this.saveAs).delete().then(() => {
          this.db.collection("state").get().subscribe(docs => {
            this.states = [];
            let i = 0;
            docs.forEach(doc => {
                var len = this.states.length;
                this.states.push({
                    name: doc.id,
                    functions: doc.data().mode,
                    args: doc.data().args,
                    key: len
                });
                if (doc.id == "current") {
                  this.stateSelection = i;
                }
                i++;
            })
            this.stateSelection = 0;
            this.selectState();
          });
        });
      }
    });
  }
}

setupNumberField(arg, selected="", spliceLocation=-1) {
    let dropdown = {
        name: arg['name'],
        selected: selected,
        notes: arg['notes'],
        type: 'INPUT',
        options: []
        };
    if (spliceLocation>=0) {
      this.selectsList.splice(spliceLocation, 0, dropdown);
    }
    else {
      this.selectsList.push(dropdown);
    }
  }
customArrayToString(arr: Array<any>, nested="") {
  let str = "[";
  for (let i = 0; i < arr.length; i ++) {
    if (Array.isArray(arr[i])) { 
      let n = "";
      if (i < arr.length-1) {
        n = ", "
      }
      str+= this.customArrayToString(arr[i], n);
    }
    else {
      str += arr[i];
      if (i < arr.length-1) {
        str += ", ";
      }
    }
  }
  return str+"]"+nested;
}
setupSelectField(arg, options, selected="", isAFunction=false, spliceLocation=-1) {
      let dropdown = {
        name: arg['name'],
        selected: selected,
        notes: arg['notes'],
        type: isAFunction ? 'FUNCTION' : 'SELECT',
        options: []
        };
        console.log(options);
        for (let i in options) {
          if (isAFunction) {
            dropdown.options.push({name: options[i].valueName, value:options[i].value});
          }
          else if (arg.type == "direction" || arg.type == "gifNames") {
              dropdown.options.push({name: options[i], value:'"'+options[i]+'"'})
          }
          else {
            dropdown.options.push({name: i, value:options[i]})
          }
        }
    if (spliceLocation>=0) {
      this.selectsList.splice(spliceLocation, 0, dropdown);
    }
    else {
      this.selectsList.push(dropdown);
    }
  }

clearArgumentFields() {
      console.log("clearing fields");
      this.selectsList = [];
}

getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key].functionName === value);
}

addFunctionSelection() {
  this.setupSelectField({ name: "Select a function", notes: ""}, this.functionsList, "", true);
}

addArgs(functionSelection, spliceLocation) {
  var selection = this.functions[functionSelection];
  let q = 0;
  for (let i in selection.args) {
      console.log(selection.args[i].type);
      switch(selection.args[i].type) {
          case "number":
            this.setupNumberField(selection.args[i], "", spliceLocation+q);
            break;
          case "list of numbers":
            this.setupNumberField(selection.args[i], "", spliceLocation+q);
            break;
          case "color":
            this.setupSelectField(selection.args[i],this.colors, "", false, spliceLocation+q);
            break;
          case "colorSequence":
            this.setupSelectField(selection.args[i],this.colorSequences, "", false, spliceLocation+q);
            break;
          case "groupOfNonagons":
            this.setupSelectField(selection.args[i],this.groupsOfNonagons, "", false, spliceLocation+q);
            break;
          case "setOfGroupsOfNonagons":
            this.setupSelectField(selection.args[i],this.setsOfGroupsOfNonagons, "", false, spliceLocation+q);
            break;
          case "audioMappings":
            this.setupSelectField(selection.args[i],this.audioMappings, "", false, spliceLocation+q);
            break;
          case "direction":
            this.setupSelectField(selection.args[i],this.directions, "", false, spliceLocation+q);
            break;
          case "gifNames":
            this.setupSelectField(selection.args[i],this.gifs, "", false, spliceLocation+q);
            break;
      }
      q++;
  }
  console.log(this.selectsList);
}
selectionChange(changedIndex) {
  if (this.selectsList[changedIndex].type == 'FUNCTION') {
    console.log(this.selectsList[changedIndex]);
    if (changedIndex == this.selectsList.length-1) {
      console.log("Just add args to the end");
    }
    else {
      console.log("Delete current args, add new");
      let i = changedIndex+1;
      while( i<this.selectsList.length && this.selectsList[i].type != 'FUNCTION') {
        this.selectsList.splice(i, 1);
      }
    }
    this.addArgs(this.selectsList[changedIndex].selected, changedIndex+1);  
  }
}
removeSelection(changedIndex) {
  if (this.selectsList[changedIndex].type == 'FUNCTION') {
    let i = changedIndex+1;
    while( i<this.selectsList.length && this.selectsList[i].type != 'FUNCTION') {
      this.selectsList.splice(i, 1);
    }
    this.selectsList.splice(changedIndex, 1);
  }
}
selectState() {
    this.clearArgumentFields();
    this.saveAs = this.states[this.stateSelection].name;
    for (let j in this.states[this.stateSelection].functions) {
        var selection = this.functions[this.states[this.stateSelection].functions[j]];
        console.log(selection);
        this.setupSelectField({ name: "Select a function", notes: ""}, this.functionsList, this.getKeyByValue(this.functions, selection.functionName), true);
        console.log(this.states[this.stateSelection].args[j]);
        let args = JSON.parse(this.states[this.stateSelection].args[j]);
        console.log(args);
        for (let i in selection.args) {
            console.log(selection.args[i].type)
            switch(selection.args[i].type) {
              case "number":
                this.setupNumberField(selection.args[i], args[i]);
                break;
              case "list of numbers":
                this.setupNumberField(selection.args[i], this.customArrayToString(args[i]));
                break;
              case "color":
                this.setupSelectField(selection.args[i],this.colors, this.customArrayToString(args[i]));
                break;
              case "colorSequence":
                this.setupSelectField(selection.args[i],this.colorSequences, this.customArrayToString(args[i]));
                break;
              case "groupOfNonagons":
                this.setupSelectField(selection.args[i],this.groupsOfNonagons, this.customArrayToString(args[i]));
                break;
              case "setOfGroupsOfNonagons":
                this.setupSelectField(selection.args[i],this.setsOfGroupsOfNonagons, this.customArrayToString(args[i]));
                break;
              case "audioMappings":
                this.setupSelectField(selection.args[i],this.audioMappings, this.customArrayToString(args[i]));
                break;
              case "direction":
                this.setupSelectField(selection.args[i],this.directions, '"'+args[i]+'"');
                break;
              case "gifNames":
                this.setupSelectField(selection.args[i],this.gifs, '"'+args[i]+'"');
                break;
            }
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