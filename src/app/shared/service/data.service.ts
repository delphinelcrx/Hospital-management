import { AngularFirestore } from "@angular/fire/compat/firestore"
import { Doctor } from "./../model/doctor"
import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private afs: AngularFirestore) {}

  addDoctor(doctor: any) {
    doctor.id = this.afs.createId()
    return this.afs.collection("Doctor/").add(doctor)
  }

  getAllDoctors() {
    return this.afs.collection("Doctor/").snapshotChanges()
  }
}
