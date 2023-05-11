import { Component, OnInit } from "@angular/core"
import { MatDialog, MatDialogConfig } from "@angular/material/dialog"
import { MatSnackBar } from "@angular/material/snack-bar"
import { TranslocoService } from "@ngneat/transloco"
import { DataService } from "src/app/shared/service/data.service"
import { AddPatientComponent } from "./add-patient/add-patient.component"
import { Patient } from "src/app/shared/model/patient"
import { Doctor } from "src/app/shared/model/doctor"

@Component({
  selector: "app-patient",
  templateUrl: "./patient.component.html",
  styleUrls: ["./patient.component.css"],
})
export class PatientComponent implements OnInit {
  allPatients: Patient[] = []
  allDoctors: Doctor[] = []

  constructor(public dialog: MatDialog, private dataApi: DataService, private _snackBar: MatSnackBar, private translocoService: TranslocoService) {}

  ngOnInit(): void {}

  addPatient() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      title: "Register patient",
      buttonName: "Register",
    }

    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log("Registred patient: ", data)
        console.log(data.doctor_id)
        this.dataApi.addPatient(data)
        this.openSnackBar("Registration of patient is successfull.", "OK")
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action)
  }
}
