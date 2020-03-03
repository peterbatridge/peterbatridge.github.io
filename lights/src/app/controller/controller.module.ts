import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControllerComponent} from './controller.component';
import { DeleteDialog }from './delete-dialog.component';
import {RouterModule, Routes} from '@angular/router';
import {firebase, FirebaseUIModule} from 'firebaseui-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from "@angular/material";

const routes: Routes = [
  {path: '', component: ControllerComponent},
];


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    FirebaseUIModule.forFeature({
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    }),
    RouterModule.forChild(routes)
  ],
  declarations: [ControllerComponent, DeleteDialog],
  entryComponents: [DeleteDialog]
})
export class ControllerModule {
}