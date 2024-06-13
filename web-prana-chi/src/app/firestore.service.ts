import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from './Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private dbPath = '/Usuarios';
  usersRef: AngularFirestoreCollection<Usuario>;

  constructor(private db: AngularFirestore) {
    this.usersRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Usuario> {
    return this.usersRef;
  }

  create(tutorial: Usuario): any {
    return this.usersRef.add({ ...tutorial });
  }

  update(id: string, data: any): Promise<void> {
    return this.usersRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.usersRef.doc(id).delete();
  }
}