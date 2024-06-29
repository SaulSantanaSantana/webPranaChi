import { Injectable } from '@angular/core';
import { Actividad } from './Actividad.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private dbPath = 'Actividades';

  constructor(private db: AngularFirestore) { }

  async createActividad(nombre: string, lugar: string, horarios: string, monitor: string, precio: number): Promise<any> {

    const id = this.db.createId();
    const docRef = this.db.collection(this.dbPath).doc(id);

    let actividad = new Actividad;
    actividad.PrecioMes = precio;
    actividad.Nombre = nombre;
    actividad.Horario = horarios;
    actividad.Lugar = lugar;
    actividad.Monitor = monitor;
    actividad.id = id;
    
    const actividadData = { ...actividad }; 

    await docRef.set( actividadData, { merge: true }).then(() => {
      alert("Actividad creada con éxito")
    });
  }

  getAllActivities(): Observable<any[]> {
    return this.db.collection(this.dbPath).valueChanges();
  }

  deleteActivity(id: string, ): Promise<void> {
    return new Promise((resolve, reject) => {
      // Borra el documento de Firestore
      this.db.collection(this.dbPath).doc(id).delete()
        .then(async () => {
          alert("Actividad eliminada")
        })
        .catch(error => {
          alert(error);
        });
    });
  }

  updateActivity(id: string, data: Actividad): Promise<void> {
    const docData = { ...data }; 
    return this.db.collection(this.dbPath).doc(id).update(docData);
  }

  generarHorario(actividades: Actividad[]) {
    const doc = new jsPDF();
    const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    const diasSemanaVer = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const horaInicioRango = 9;
    const horaFinRango = 21;
  
    const data = Array.from({ length: horaFinRango - horaInicioRango }, (_, i) => 
      [`${i + horaInicioRango}:00`, ...Array(7).fill(" - ")]
    );
  
    actividades.forEach(actividad => {
      if (actividad.Horario) {
        actividad.Horario.split(', ').forEach(dia => {
          const horarioDia = dia.split(": ");
          const horas = horarioDia[1].split(",");
          for (let i = +horas[0].split(":")[0]; i <= +horas[1].split(":")[0]; i++) {
            const diaIndex = diasSemana.indexOf(horarioDia[0]);
            if (diaIndex >= 0) {
              data[i - horaInicioRango][diaIndex + 1] = actividad.Nombre || "Ocupado";
            }
          }
        });
      }
    });

    const titulo = 'Horario Semanal de Parana & Chi';
  
    autoTable(doc, {
      head: [['Hora', ...diasSemanaVer]],
      body: data,
      didDrawPage: function (data) {
        // Encabezado
        doc.setFontSize(16);
        doc.setTextColor(40);
        doc.text(titulo, data.settings.margin.left, 125);
      }
    });
  
    doc.save('horario.pdf');
  }

}
