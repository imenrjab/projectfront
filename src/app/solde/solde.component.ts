import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CongeService } from '../services-gestion-employe/conge.service';
import { CardModule } from 'primeng/card';
import { EmployeSociete, Fonction } from '../models-gestion-employe/EmployeSociete';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
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
import { AuthService } from '../services-gestion-employe/auth.service';
import { Soldedto } from '../models-gestion-employe/soldedto';
interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}


interface ExportColumn {
  title: string;
  dataKey: string;
}
interface DegreeOption {
    label: string;
    value: string;
  }
@Component({
  selector: 'app-solde',
  standalone: true,
  imports:[  CommonModule,
      TableModule,
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
      ConfirmDialogModule,
    DropdownModule,
    ConfirmDialogModule],
    providers: [MessageService, ConfirmationService],
  templateUrl: './solde.component.html',
  styleUrls: ['./solde.component.scss']
})
export class SoldeComponent {
 employeDialog : boolean = false;
   
 
   soldes: Soldedto[] = [];
 
     employes = signal<EmployeSociete[]>([]);
     poste : string[]=["T_G","T_V","AUX","HRSG"]
     degrees: string[] = ["CADRE", "MAITRISE", "STAGIAIRE"];
 
 
    employe: EmployeSociete ={id:0, nom :'',prenom :'',matrecule :0, tele :0, fonction :Fonction.AGENT, degre :'', adress:'',  email :'',  enabled :true,roles : [] ,poste:'', password:''};
 
 
     selectedEmploye!: EmployeSociete[] | null;
 
 
     submitted: boolean = false;
     submittedaddnew: boolean = false;
     submittedupdate: boolean = false;
     statuses!: any[];
 
 
     @ViewChild('dt') dt!: Table;
 
 
     exportColumns!: ExportColumn[];
 
 
     cols!: Column[];
 
 
     constructor(
         private congeservice: CongeService,
         private messageService: MessageService,
         private confirmationService: ConfirmationService
     ) {
 
        
         }
     
 
 
     exportCSV() {
         this.dt.exportCSV();
     }
 
 
     ngOnInit() {
         this.loadDemoData();
        
     }
 loadSoldes(userId:number): void {
    this.congeservice.getSoldesByUser(userId).subscribe({
      next: (data) => this.soldes = data,
      error: (err) => console.error('Erreur de chargement des soldes', err)
    });
  }
 
     loadDemoData() {
         this.congeservice.getAllEmployeSociete().subscribe((data) => {
             this.employes.set(data);
 
 
             console.log("employes",this.employes())
         });
         this.cols = [
           { field: 'id', header: 'Id' },
             { field: 'nom', header: 'Nom' },
             { field: 'prenom', header: 'Prenom' },
             { field: 'matrecule', header: 'Matricule' },           
             { field: 'tele', header: 'Tele' },
             { field: 'fonction', header: 'Fonction' },
             { field: 'email', header: 'Email' },
             { field: 'enabled', header: 'Enabled' },
          
         ];
 
 
         this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
     }
 
 
     onGlobalFilter(table: Table, event: Event) {
         table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
     }
 
 
     openNew(userId:number) {
         this.employe={id:0, nom :'',prenom :'',matrecule :0, tele :0, fonction :Fonction.AGENT , degre :'', adress:'',  email :'',  enabled :true,roles : [] ,poste:'', password:''};
         this.submitted = false;
         this.employeDialog = true;
         this.submittedaddnew= true;
         this.submittedupdate= false;
          this.loadSoldes(userId)
     }

     hideDialog() {
         this.employeDialog = false;
         this.submitted = false;
     }
 
 
     findIndexById(id: number): number {
         let index = -1;
         for (let i = 0; i < this.employes().length; i++) {
             if (this.employes()[i].id === id) {
                 index = i;
                 break;
             }
         }
 
 
         return index;
     }
 
 
 initializeEmployeeSolde(employeeId: number) {
  this.congeservice.initializeSolde(employeeId).subscribe({
    next: (response) => {
     
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Solde initialisé avec succès.',
        life: 3000
      });
    },
    error: (error) => {
      console.error('Initialization failed', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Échec de l\'initialisation du solde.',
        life: 3000
      });
    }
  });
}

}
 
    
 
 
       

    
 
 