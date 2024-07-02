import { Injectable } from '@angular/core';
import { Documento } from './Documento.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private dbPath = 'Documentos';

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  async createDocument(nombre: string, url: string, visible: boolean): Promise<any> {

    const id = this.db.createId();
    const docRef = this.db.collection(this.dbPath).doc(id);

    let doc = new Documento;
    doc.Nombre = nombre;
    doc.Url = url;
    doc.Visible = visible;
    doc.id = id;
    
    const docData = { ...doc }; 

    await docRef.set( docData, { merge: true }).then(() => {
      alert("Docuemnto Subido con éxito")
    });
  }

  async uploadDocuemt(file: File, name: string) {
    const filePath = `files/${name}`;
    const fileRef = this.storage.ref(filePath);
    await this.storage.upload(filePath, file);

    try {
      const downloadURL = await firstValueFrom(fileRef.getDownloadURL());
      return downloadURL
    } catch (error) {
      alert("No se ha podido subir el documento")
    }
  }

  getAllDocuments(): Observable<any[]> {
    return this.db.collection(this.dbPath).valueChanges();
  }

  deleteDocument(documentID: string, filename: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Borra el documento de Firestore
      this.db.collection(this.dbPath).doc(documentID).delete()
        .then(async () => {
          // Borra el archivo de Firebase Storage
          const filePath = `files/${filename}`;
          const storageRef = this.storage.ref(filePath);
          storageRef.delete()
          alert("Documento eliminado")
        })
        .catch(error => {
          alert(error);
        });
    });
  }

  updateVisibility(id: string, data: Documento): Promise<void> {
    const docData = { ...data }; 
    return this.db.collection(this.dbPath).doc(id).update(docData);
  }

}
