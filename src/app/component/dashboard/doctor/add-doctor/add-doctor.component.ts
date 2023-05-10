import { Component, Inject, OnInit, inject } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import { TranslocoService } from "@ngneat/transloco"

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
  id!: string
  buttonName!: string
  departments: string[] = [
    this.translocoService.translate("doctors.departments.orthopedics"),
    this.translocoService.translate("doctors.departments.cardiology"),
    this.translocoService.translate("doctors.departments.otorhinolaryngology"),
    this.translocoService.translate("doctors.departments.osychiatry"),
    this.translocoService.translate("doctors.departments.internalMedicine"),
    this.translocoService.translate("doctors.departments.radiology"),
    this.translocoService.translate("doctors.departments.surgery"),
    this.translocoService.translate("doctors.departments.pediatrics"),
    this.translocoService.translate("doctors.departments.pulmonology"),
    this.translocoService.translate("doctors.departments.generalSurgery"),
    this.translocoService.translate("doctors.departments.intensiveCareMedicine"),
    this.translocoService.translate("doctors.departments.oncology"),
    this.translocoService.translate("doctors.departments.emergencyMedicine"),
    this.translocoService.translate("doctors.departments.neonatology"),
    this.translocoService.translate("doctors.departments.hematology"),
    this.translocoService.translate("doctors.departments.pharmacy"),
    this.translocoService.translate("doctors.departments.geriatrics"),
    this.translocoService.translate("doctors.departments.gynaecology"),
    this.translocoService.translate("doctors.departments.cardiacSurgery"),
    this.translocoService.translate("doctors.departments.outpatientDepartment"),
    this.translocoService.translate("doctors.departments.intensiveCareUnit"),
    //"Oncology"
  ]

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<AddDoctorComponent>,
    private translocoService: TranslocoService
  ) {
    this.title = data.title
    this.id = data.id
    this.name = data.name
    this.mobile = data.mobile
    this.email = data.email
    this.gender = data.gender
    this.department = data.department
    this.birthdate = data.birthdate
    this.qualification = data.qualification
    this.buttonName = data.buttonName
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.id, []],
      name: [this.name, [Validators.required]],
      mobile: [this.mobile, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      email: [this.email, [Validators.required, Validators.email]],
      gender: [this.gender, [Validators.required]],
      department: [this.department, [Validators.required]],
      birthdate: [this.birthdate, [Validators.required]],
      qualification: [this.qualification, [Validators.required]],
    })
  }

  cancelRegistration() {
    this.dialogRef.close()
  }

  registerDoctor() {
    this.dialogRef.close(this.form.value)
  }
}
