import { AngularFirestore } from "@angular/fire/compat/firestore"
import { Doctor } from "./../model/doctor"
import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private afs: AngularFirestore) {}

  /** Doctors **/

  addDoctor(doctor: any) {
    doctor.id = this.afs.createId()
    return this.afs.collection("Doctor/").add(doctor)
  }

  getAllDoctors() {
    return this.afs.collection("Doctor/").snapshotChanges()
  }

  updateDoctor(doctor: any) {
    return this.afs.doc("Doctor/" + doctor.id).update(doctor)
  }

  deleteDoctor(id: string) {
    return this.afs.doc("Doctor/" + id).delete()
  }

  getDoctorById(id: string) {
    return this.afs.doc("Doctor/" + id).valueChanges()
  }

  /** Patient **/

  addPatient(patient: any) {
    patient.patient_id = this.afs.createId()
    return this.afs.collection("Patient/").add(patient)
  }

  getAllPatients() {
    return this.afs.collection("Patient/").snapshotChanges()
  }
}
