import { DoctorComponent } from "./component/dashboard/doctor/doctor.component"
import { ViewDoctorComponent } from "./component/dashboard/doctor/view-doctor/view-doctor.component"
import { PatientComponent } from "./component/dashboard/patient/patient.component"
import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

const routes: Routes = [
  {
    path: "dashboard",
    children: [
      { path: "", redirectTo: "patient", pathMatch: "full" },
      { path: "patient", component: PatientComponent },
      { path: "doctor", component: DoctorComponent },
      { path: "doctor/:id", component: ViewDoctorComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
