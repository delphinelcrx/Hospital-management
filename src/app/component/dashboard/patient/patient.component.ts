import { Component, OnInit, ViewChild } from "@angular/core"
import { MatDialog, MatDialogConfig } from "@angular/material/dialog"
import { MatSnackBar } from "@angular/material/snack-bar"
import { TranslocoService } from "@ngneat/transloco"
import { DataService } from "src/app/shared/service/data.service"
import { AddPatientComponent } from "./add-patient/add-patient.component"
import { Patient } from "src/app/shared/model/patient"
import { Doctor } from "src/app/shared/model/doctor"
import { MatPaginator } from "@angular/material/paginator"
import { MatSort } from "@angular/material/sort"
import { MatTableDataSource } from "@angular/material/table"
import { DeletePatientComponent } from "./delete-patient/delete-patient.component"

@Component({
  selector: "app-patient",
  templateUrl: "./patient.component.html",
  styleUrls: ["./patient.component.css"],
})
export class PatientComponent implements OnInit {
  allPatients: Patient[] = []
  allDoctors: Doctor[] = []

  displayedColumns: string[] = ["name", "mobile", "doctor", "gender", "action"]
  dataSource!: MatTableDataSource<Patient>

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(public dialog: MatDialog, private dataApi: DataService, private _snackBar: MatSnackBar, private translocoService: TranslocoService) {}

  ngOnInit(): void {
    this.getAllPatients()
    this.getAllDoctors()
  }

  addPatient() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      // title: "Register patient",
      // buttonName: "Register",
      title: this.translocoService.translate("patients.addPatient.matDialog-title"),
      buttonName: this.translocoService.translate("matDialog.registerButton"),
    }

    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log("Registred patient: ", data)
        console.log(data.doctor_id)
        this.dataApi.addPatient(data)
        this.openSnackBar(this.translocoService.translate("patients.addPatient.validMessage"), "OK")
      }
    })
  }

  getAllPatients() {
    this.dataApi.getAllPatients().subscribe((res) => {
      this.allPatients = res.map((e: any) => {
        const data = e.payload.doc.data()
        data.patient_id = e.payload.doc.id
        return data
      })

      this.dataSource = new MatTableDataSource(this.allPatients)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  getAllDoctors() {
    this.dataApi.getAllDoctors().subscribe((res) => {
      this.allDoctors = res.map((e: any) => {
        const data = e.payload.doc.data()
        data.id = e.payload.doc.id
        return data
      })
    })
  }

  getDoctorName(id: string) {
    let doctorName = ""
    this.allDoctors.forEach((element) => {
      if (element.id == id) {
        doctorName = element.name
      }
    })
    return doctorName
  }

  viewPatient(row: any) {
    window.open("dashboard/patient/" + row.patient_id, "_blank")
  }

  editPatient(row: any) {
    if (row.patient_id == null || row.patient_name == null) {
      return
    }
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = row
    dialogConfig.data.title = "Edit patient"
    dialogConfig.data.buttonName = "Update"
    dialogConfig.data.admission_date = row.admission_date.toDate()

    console.log(dialogConfig.data)

    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.dataApi.updatePatient(data)
        this.openSnackBar(this.translocoService.translate("patients.editPatient.validMessage"), "OK")
      }
    })
  }

  deletePatient(row: any) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      title: this.translocoService.translate("patients.deletePatient.matDialog-title"),
      patientName: row.patient_name,
    }

    const dialogRef = this.dialog.open(DeletePatientComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log(row)
        this.dataApi.deletePatient(row.patient_id)
        this.openSnackBar(this.translocoService.translate("patients.deletePatient.validMessage"), "OK")
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
}
