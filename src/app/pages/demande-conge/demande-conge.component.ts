import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GestioncongeService } from '../../services-gestion-employe/gestionconge.service';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { Message, MessageModule } from 'primeng/message';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { TableModule, Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CongeDto, CongeStatus, TypeConge } from '../../models-gestion-employe/congedto';
import { Periodeconge } from '../../models-gestion-employe/periodeconge';



interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}


interface ExportColumn {
  title: string;
  dataKey: string;
}



@Component({
  selector: 'app-demande-conge',
  standalone: true,
  templateUrl: './demande-conge.component.html',
  imports: [
    CommonModule,
          TableModule,
          CalendarModule,
          FormsModule,
          ButtonModule,
          RippleModule,
          ToastModule,
          ToolbarModule,
          RatingModule,
          InputTextModule,
          TextareaModule,
          SelectModule,
          RadioButtonModule,
          InputNumberModule,
          DialogModule,
          TagModule,
          InputIconModule,
          IconFieldModule,
          ConfirmDialogModule],
          providers: [MessageService, GestioncongeService, ConfirmationService]
})

export class DemandeCongeComponent {

 

  congeDtoDialog: boolean = false;
   congeperiode: Periodeconge={dateDebut:new Date("1900-01-01"),dateFin:new Date("1900-01-01")}

congeDtos = signal<CongeDto[]>([]);


congeDto: CongeDto = {
  id: 0,
  iduser: 0,
  date_de_demende: new Date(), // date de la demande
  dateDebut: new Date("1900-01-01"),
  dateFin: new Date("1900-01-01"),
  daysTaken: 0,
  status: CongeStatus.EN_ATTENTE,
  typeConge: TypeConge.ANNUELE,
  approuve: false,
};


selectedConges!: CongeDto[] | null;


submitted: boolean = false;
submittedaddnew: boolean = false;
submittedupdate: boolean = false;
statuses!: any[];


@ViewChild('dt') dt!: Table;


exportColumns!: ExportColumn[];


cols!: Column[];


constructor(
    private congeService: GestioncongeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
) {}


exportCSV() {
    this.dt.exportCSV();
}


ngOnInit() {
    this.loadDemoData();
   
}


loadDemoData() {
    this.congeService.gtCongesParEemployecon().subscribe((data) => {
        this.congeDtos.set(data);


        console.log("congeDtos",this.congeDtos())
    });
    this.cols = [
        { field: 'titre', header: 'Titre' },
        { field: 'description', header: 'Description' },
        { field: 'sessionIds', header: 'Session' }
    ];


   


    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
}
//filter

onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}


openNew() {
   this.congeDto = {
    id: 0,
    iduser: 123,
    date_de_demende: new Date(), // date de la demande
    dateDebut: new Date("2025-06-01"),
    dateFin: new Date("2025-06-10"),
    daysTaken: 10,
    status: CongeStatus.EN_ATTENTE,
    typeConge: TypeConge.ANNUELE,
    approuve: false,
  }; 
     this.submitted = false;
    this.congeDtoDialog = true;
    this.submittedaddnew= true;
    this.submittedupdate= false;
}


editconge(congeDto: CongeDto) {
    this.congeDto = { ...congeDto };
    this.congeDtoDialog = true;
    console.log("imen",this.congeDto)
    this.submittedaddnew= false;
    this.submittedupdate= true;
}


deleteSelectedConge() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected conge?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.congeDtos.set(this.congeDtos().filter((val) => !this.selectedConges?.includes(val)));
            this.selectedConges = null;
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'conge Deleted',
                life: 3000
            });
        }
    });
}


hideDialog() {
    this.congeDtoDialog = false;
    this.submitted = false;
}


// deleteConge(congeDto: CongeDto) {
//     this.confirmationService.confirm({
//         message: 'Are you sure you want to delete ' + congeDto. + '?',
//         header: 'Confirm',
//         icon: 'pi pi-exclamation-triangle',
//         accept: () => {
//             this.congeService.del(this.congeDto.id).subscribe({
//                 next: (newcongeDto) => {
                 
//                 },
//                 error: (err) => {
//                     this.messageService.add({
//                         severity: 'error',
//                         summary: 'Error',
//                         detail: 'Failed to create congeDto',
//                         life: 3000
//                     });
//                     console.error('Error creating congeDto:', err);
//                 }
//             });
//             this.congeDtos.set(this.congeDtos().filter((val) => val.id !== congeDto.id));
//             //this.Formation = new Formation();
//             this.messageService.add({
//                 severity: 'success',
//                 summary: 'Successful',
//                 detail: 'Formation Deleted',
//                 life: 3000
//             });
//         }
//     });
// }


findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.congeDtos().length; i++) {
        if (this.congeDtos()[i].id === id) {
            index = i;
            break;
        }
    }


    return index;
}


/*   createId(): number {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
} */


/* getSeverity(status: string) {
    switch (status) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warn';
        case 'OUTOFSTOCK':
            return 'danger';
        default:
            return 'info';
    }
} */


saveConge() {
    this.submitted = true;

    if (this.congeDto.dateDebut) {
        if (this.congeDto.id) {


            this.congeService.updateDemandeParEmploye(this.congeDto.id,this.congeDto).subscribe({
                next: (newcongeDto) => {
                    this.loadDemoData();
                    this.messageService.add({


                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Formation Updated',
                        life: 3000
                    });
                },
                error: (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to create conge',
                        life: 3000
                    });
                    console.error('Error creating conge:', err);
                }
            });


            // Mise à jour locale de la formation dans le Signal Store
           /*  let _Formations = this.formations();
            _Formations[this.findIndexById(this.formation.id)] = this.formation;
            this.formations.set([..._Formations]); */

            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Conge Updated',
                life: 3000
            });
        } else {
            console.log("hhhh2",this.congeDto)
            // Consommer le service pour enregistrer la formation en backend
            this.congeDto.date_de_demende=new Date()
            this.congeService.demanderConge(this.congeDto).subscribe({
                next: (newcongeDto) => {
                    this.congeDtos.set([...this.congeDtos(), newcongeDto]);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'conge Created',
                        life: 3000
                    });
                },
                error: (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to create conge',
                        life: 3000
                    });
                    console.error('Error creating conge:', err);
                }
            });
        }

        this.congeDtoDialog = false;
    }
}

}




