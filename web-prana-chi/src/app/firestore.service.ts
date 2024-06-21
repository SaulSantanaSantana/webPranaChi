import { Injectable } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Usuario } from './Usuario.model';

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

  async createUser(nombre: string, mail: string): Promise<any> {
    let uidUsuairo = this.db.createId();
    const docRef = this.db.collection(this.dbPath).doc(uidUsuairo);

    let usuario = new Usuario;
    usuario.Nombre = nombre;
    usuario.Correo = mail;
    usuario.id = uidUsuairo;
    usuario.Datos = "";
    usuario.perfiles = [nombre.split(" ")[0]]
    
    const usuarioData = { ...usuario }; 

    await docRef.set( usuarioData, { merge: true }).then(() => {
      alert("Cuenta creada con éxito")
    });
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