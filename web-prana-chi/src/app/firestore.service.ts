import { Injectable } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Usuario } from './Usuario.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private dbPath = 'Usuarios';
  usersRef: AngularFirestoreCollection<Usuario>;

  constructor
  (private db: AngularFirestore, public afstorage: AngularFireStorage,) {
    this.usersRef = db.collection(this.dbPath);
  }

  async createUser(nombre: string, mail: string, uid:string): Promise<any> {
    const docRef = this.db.collection(this.dbPath).doc(uid);

    let usuario = new Usuario;
    usuario.Nombre = nombre;
    usuario.Correo = mail;
    usuario.id = uid;
    usuario.Telefono = "";
    usuario.Datos = "";
    usuario.perfiles = [nombre.split(" ")[0]]
    
    const usuarioData = { ...usuario }; 

    await docRef.set( usuarioData, { merge: true }).then(() => {
      alert("Cuenta creada con éxito")
    });
  }

  getUser(id: string): Observable<any> {
    return this.db.collection(this.dbPath).doc(id).valueChanges();
  }

  updateUser(id: string, data: Usuario): Promise<void> {
    const usuarioData = { ...data }; 
    return this.db.collection(this.dbPath).doc(id).update(usuarioData);
  }

  getAll(): AngularFirestoreCollection<Usuario> {
    return this.usersRef;
  }

  update(id: string, data: any): Promise<void> {
    return this.usersRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.usersRef.doc(id).delete();
  }
}