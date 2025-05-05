import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { AuthService } from '../../../services-gestion-employe/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Ronders } from '../../../models-gestion-employe/Ronders';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { Fonction, Rondersemp } from '../../../models-gestion-employe/Rondersemp';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

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
  selector: 'app-gestion-employe',
  standalone:true,
  imports:[
  CommonModule,
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
  DatePickerModule,
  TagModule,
  InputIconModule,
  IconFieldModule,
  DropdownModule,
  ConfirmDialogModule],
   providers: [MessageService, ConfirmationService],

  templateUrl:'./gestion-employe.component.html',
  styleUrl: './gestion-employe.component.scss'
})
export class GestionEmployeComponent implements OnInit {

  employeDialog : boolean = false;

    employes = signal<Rondersemp[]>([]);
    poste : string[]=["T_G","T_V","AUX","HRSG"]
    



   employe: Rondersemp ={id:0, nom :'',prenom :'',matrecule :0, tele :0, fonction :Fonction.AGENT, degre :'', adress:'',  email :'',  enabled :true,roles : [] ,poste:'', password:''};


    selectedEmploye!: Rondersemp[] | null;


    submitted: boolean = false;
    submittedaddnew: boolean = false;
    submittedupdate: boolean = false;
    statuses!: any[];


    @ViewChild('dt') dt!: Table;


    exportColumns!: ExportColumn[];


    cols!: Column[];


    constructor(
        private authService: AuthService,
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
        this.authService.getAllemploye().subscribe((data) => {
            this.employes.set(data);


            console.log("employes",this.employes())
        });
        this.cols = [
          { field: 'id', header: 'Id' },
            { field: 'nom', header: 'Nom' },
            { field: 'prenom', header: 'Prenom' },
            { field: 'matrecule', header: 'Matricule' },
            { field: 'tele', header: 'Tele' },
            { field: 'degre', header: 'degre' },
            { field: 'fonction', header: 'Fonction' },

            { field: 'adress', header: 'Adresse' },
            { field: 'email', header: 'Email' },
            { field: 'enabled', header: 'Enabled' },
            { field: 'roles', header: 'Roles' },
            { field: 'poste', header: 'Poste' },






        ];


        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


    openNew() {
        this.employe={id:0, nom :'',prenom :'',matrecule :0, tele :0, fonction :Fonction.AGENT , degre :'', adress:'',  email :'',  enabled :true,roles : [] ,poste:'', password:''};
        this.submitted = false;
        this.employeDialog = true;
        this.submittedaddnew= true;
        this.submittedupdate= false;
    }


    editEmploye(employe: Rondersemp) {
        this.employe = { ...employe };
        this.employeDialog = true;
        console.log("ridha",this.employe)
        this.submittedaddnew= false;
        this.submittedupdate= true;
    }


    
            
        
    

    hideDialog() {
        this.employeDialog = false;
        this.submitted = false;
    }


    deleteRonders(employe: Ronders) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + employe.id + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.authService.deleteemploye(this.employe.id).subscribe({
                    next: (newemploye) => {
                     
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to create employe',
                            life: 3000
                        });
                        console.error('Error creating employe:', err);
                    }
                });
                this.employes.set(this.employes().filter((val) => val.id !== employe.id));
                //this.employe = new employe();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'employe Deleted',
                    life: 3000
                });
            }
        });
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


    saveEmploye() {
        this.submitted = true;
   
        if (this.employe.nom.trim()) {
            if (this.employe.id) {

                 
                this.authService.updatemploye(this.employe).subscribe({
                    next: (newEmploye) => {
                        this.loadDemoData();
                        this.messageService.add({


                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Employe Updated',
                            life: 3000
                        });
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to create Employe',
                            life: 3000
                        });
                        console.error('Error creating employe:', err);
                    }
                });


                // Mise à jour locale de la formation dans le Signal Store
               /*  let _Formations = this.formations();
                _Formations[this.findIndexById(this.formation.id)] = this.formation;
                this.formations.set([..._Formations]); */
   
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Employe Updated',
                    life: 3000
                });
            } else {
                console.log("hhhh2",this.employe)
                // Consommer le service pour enregistrer la formation en backend
                this.authService.signUpRonders(this.employe).subscribe({
                    next: (newEmploye) => {
                        this.employes.set([...this.employes(), newEmploye]);
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Employe Created',
                            life: 3000
                        });
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to create employe',
                            life: 3000
                        });
                        console.error('Error creating employe:', err);
                    }
                });
            }
   
            this.employeDialog = false;
        }
    }
   
}
