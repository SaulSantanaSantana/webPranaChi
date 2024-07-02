import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentService } from '../../document.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-document',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './upload-document.component.html',
  styleUrl: './upload-document.component.css'
})
export class UploadDocumentComponent {

  nombre: string = ""
  visible: boolean = true
  documento: File | null = null;

  onFileSelected(event: any) {
    this.documento = event.target.files[0];
  }

  constructor(private docService: DocumentService) { }

  async uploadDocument() {
    if (this.nombre == ""){
      alert('Debe seleccionar un nombre');
    } else if (this.documento) {
      const downloadURL = await this.docService.uploadDocuemt(this.documento, this.nombre)
      this.docService.createDocument(this.nombre, downloadURL, this.visible).then( () => {
        if(this.visible){
          alert("Documento Publicado!")
        }else{
          alert("Documento Publicado!")
        }
        this.documento = null
        this.nombre = ""
      })
    } else {
      alert('Debe seleccionar un docuemnto');
    }
  }

  togglePublishState() {
    this.visible = !this.visible;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.target as HTMLElement).classList.add('dragover');
  }

  onDrop(event: DragEvent, fileInput: HTMLInputElement) {
    event.preventDefault();
    event.stopPropagation();
    (event.target as HTMLElement).classList.remove('dragover');

    if (event.dataTransfer?.files) {
      this.documento = event.dataTransfer.files[0];

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(this.documento);
      fileInput.files = dataTransfer.files;
    }
  }

}
