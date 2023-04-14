import { Component, Inject, OnInit, inject } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"

@Component({
  selector: "app-add-doctor",
  templateUrl: "./add-doctor.component.html",
  styleUrls: ["./add-doctor.component.css"],
})
export class AddDoctorComponent implements OnInit {
  form!: FormGroup
  title!: string
  name!: string
  mobile!: string
  email!: string
  gender!: string
  department!: string
  birthdate!: Date
  qualification!: string
  departments: string[] = [
    "Orthopedics",
    "Cardiology",
    "Otorhinolaryngology",
    "Psychiatry",
    "Internal medicine",
    "Radiology",
    "Surgery",
    "Pediatrics",
    "Pulmonology",
    "General surgery",
    "Intensive care medicine",
    "Oncology",
    "Emergency medicine",
    "Neonatology",
    "Hematology",
    "Pharmacy",
    "Geriatrics",
    "Gynaecology",
    "Cardiac surgery",
    "Outpatient department",
    "Intensive care unit",
    "Operating room",
    "Casulaty department",
  ]

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<AddDoctorComponent>) {
    this.title = data.title
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: ["", []],
      name: ["", [Validators.required]],
      mobile: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      email: ["", [Validators.required, Validators.email]],
      gender: ["", [Validators.required]],
      department: ["", [Validators.required]],
      birthdate: ["", [Validators.required]],
      qualification: ["", [Validators.required]],
    })
  }

  cancelRegistration() {
    this.dialogRef.close()
  }

  registerDoctor() {
    this.dialogRef.close(this.form.value)
  }
}
