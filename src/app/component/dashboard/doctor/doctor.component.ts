import { Component, OnInit, ViewChild } from "@angular/core"
import { MatDialog, MatDialogConfig } from "@angular/material/dialog"
import { AddDoctorComponent } from "./add-doctor/add-doctor.component"
import { DataService } from "src/app/shared/service/data.service"
import { MatSnackBar } from "@angular/material/snack-bar"
import { Doctor } from "src/app/shared/model/doctor"
import { MatPaginator } from "@angular/material/paginator"
import { MatSort } from "@angular/material/sort"
import { MatTableDataSource } from "@angular/material/table"

@Component({
  selector: "app-doctor",
  templateUrl: "./doctor.component.html",
  styleUrls: ["./doctor.component.css"],
})
export class DoctorComponent implements OnInit {
  doctorsArr: Doctor[] = []
  displayedColumns: string[] = ["name", "mobile", "email", "department", "gender", "action"]
  dataSource!: MatTableDataSource<Doctor>

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(public dialog: MatDialog, private dataApi: DataService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllDoctors()
  }

  addDoctor() {
    //alert("add doctor method clicked")
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      title: "Register doctor",
      buttonName: "Register",
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

  editDoctor(row: any) {
    if (row.id == null || row.name == null) {
      return
    }
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = row
    dialogConfig.data.title = "Edit doctor"
    dialogConfig.data.buttonName = "Update"
    dialogConfig.data.birthdate = row.birthdate.toDate()

    const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.dataApi.updateDoctor(data)
        this.openSnackBar("Doctor is updated successfully.", "OK")
      }
    })
  }

  getAllDoctors() {
    this.dataApi.getAllDoctors().subscribe((res) => {
      this.doctorsArr = res.map((e: any) => {
        const data = e.payload.doc.data()
        data.id = e.payload.doc.id
        return data
      })

      this.dataSource = new MatTableDataSource(this.doctorsArr)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
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
