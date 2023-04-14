import { MaterialModule } from "./material/material/material.module"
import { environment } from "./../environments/environment.prod"
import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AngularFireModule } from "@angular/fire/compat"
import { AngularFirestoreModule } from "@angular/fire/compat/firestore"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { DoctorComponent } from "./component/dashboard/doctor/doctor.component"
import { PatientComponent } from "./component/dashboard/patient/patient.component"
import { SidebarComponent } from "./component/dashboard/sidebar/sidebar.component"
import { AddDoctorComponent } from "./component/dashboard/doctor/add-doctor/add-doctor.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

@NgModule({
  declarations: [AppComponent, DoctorComponent, PatientComponent, SidebarComponent, AddDoctorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddDoctorComponent],
})
export class AppModule {}
