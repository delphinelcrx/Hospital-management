import { Component, OnInit } from "@angular/core"
import { MatDialog, MatDialogConfig } from "@angular/material/dialog"
import { AddDoctorComponent } from "./add-doctor/add-doctor.component"
import { DataService } from "src/app/shared/service/data.service"
import { MatSnackBar } from "@angular/material/snack-bar"

@Component({
  selector: "app-doctor",
  templateUrl: "./doctor.component.html",
  styleUrls: ["./doctor.component.css"],
})
export class DoctorComponent implements OnInit {
  constructor(public dialog: MatDialog, private dataApi: DataService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  addDoctor() {
    //alert("add doctor method clicked")
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      title: "Register doctor",
    }

    const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log("Registred doctor: ", data)
        this.dataApi.addDoctor(data)
        this.openSnackBar("Registration of doctor is successfull.", "OK")
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action)
  }
}
