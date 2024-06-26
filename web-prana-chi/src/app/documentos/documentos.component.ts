import { Component } from '@angular/core';
import { NavbarSecondaryComponent } from '../navbar-secondary/navbar-secondary.component';
import { UploadDocumentComponent } from '../upload-document/upload-document.component';
import { Documento } from '../Documento.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserService } from '../firestore.service';
import { DocumentServiceService } from '../document-service.service';

@Component({
  selector: 'app-documentos',
  standalone: true,
  imports: [NavbarSecondaryComponent, UploadDocumentComponent],
  templateUrl: './documentos.component.html',
  styleUrl: './documentos.component.css'
})
export class DocumentosComponent {

  admin: boolean = false
  documentos: Documento[] = []

  constructor(private documentService: DocumentServiceService, private auth: AngularFireAuth, private afs: UserService){}

  ngOnInit() {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.afs.getUser(user.uid).subscribe(document => {
          if (document) {
            this.admin = document.admin;
          } else {
            alert("Error al acceder a la informacion de usuario")
          }
        });

        this.documentService.getAllDocuments().subscribe(data => {
          this.documentos = data;
        });
      } else {
        // User is signed out
        // ...
      }
    });
    
  }

  toggleVisibility(documento: Documento){
    documento.Visible = !documento.Visible
    if(documento.id){
      this.documentService.updateVisibility(documento.id, documento)
    }
  }

  deleteDocumento(documento: Documento){

    if(documento.id && documento.Nombre){
      this.documentService.deleteDocument(documento.id, documento.Nombre)
    }
  }

}
