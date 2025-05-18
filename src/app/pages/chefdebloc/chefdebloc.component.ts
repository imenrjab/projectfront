import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
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
import { Ronders } from '../../models-gestion-employe/Ronders';
import { EmployeSociete, Fonction } from '../../models-gestion-employe/EmployeSociete';
import { AuthService } from '../../services-gestion-employe/auth.service';

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
  selector: 'app-chefdebloc',
  imports: [
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
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './chefdebloc.component.html',
  styleUrl: './chefdebloc.component.scss'
})
export class ChefdeblocComponent implements OnInit {
  employeDialog: boolean = false;
  employes = signal<EmployeSociete[]>([]);
  poste: string[] = ["T_G", "T_V"];
  degrees: string[] = ["CADRE", "MAITRISE", "STAGIAIRE"];
  chefdebloc: EmployeSociete = {
    id: 0,
    nom: '',
    prenom: '',
    matrecule: 0,
    tele: 0,
    fonction: Fonction.AGENT,
    degre: '',
    adress: '',
    email: '',
    enabled: true,
    roles: [],
    poste: '',
    password: ''
  };
  selectedEmploye: EmployeSociete[] = [];
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

  ngOnInit() {
    this.loadDemoData();
  }

  loadDemoData() {
    this.authService.getAllemployebloc().subscribe((data) => {
      this.employes.set(data);
      console.log("employes", this.employes());
    });
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'nom', header: 'Nom' },
      { field: 'prenom', header: 'Prenom' },
      { field: 'matrecule', header: 'Matricule' },
      { field: 'tele', header: 'Tele' },
      { field: 'degre', header: 'Degre' },
      { field: 'fonction', header: 'Fonction' },
      { field: 'adress', header: 'Adresse' },
      { field: 'email', header: 'Email' },
      { field: 'enabled', header: 'Enabled' },
      { field: 'roles', header: 'Roles' },
      { field: 'poste', header: 'Poste' },
    ];
    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  chefdeblocs(): EmployeSociete[] {
    return this.employes();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNew() {
    this.chefdebloc = {
      id: 0,
      nom: '',
      prenom: '',
      matrecule: 0,
      tele: 0,
      fonction: Fonction.AGENT,
      degre: '',
      adress: '',
      email: '',
      enabled: true,
      roles: [],
      poste: '',
      password: ''
    };
    this.submitted = false;
    this.employeDialog = true;
    this.submittedaddnew = true;
    this.submittedupdate = false;
  }

  editEmploye(employe: EmployeSociete) {
    this.chefdebloc = { ...employe };
    this.employeDialog = true;
    this.submittedaddnew = false;
    this.submittedupdate = true;
  }

  hideDialog() {
    this.employeDialog = false;
    this.submitted = false;
  }

  saveEmploye() {
    this.submitted = true;
    if (this.chefdebloc.nom.trim()) {
      if (this.chefdebloc.id) {
        this.authService.updatemployebloc(this.chefdebloc).subscribe({
          next: () => {
            this.loadDemoData();
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Employé mis à jour',
              life: 3000
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Échec de mise à jour',
              life: 3000
            });
          }
        });
      } else {
        this.authService.signUpRonders(this.chefdebloc).subscribe({
          next: (newEmploye) => {
            this.employes.set([...this.employes(), newEmploye]);
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Employé créé',
              life: 3000
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Échec de création',
              life: 3000
            });
          }
        });
      }
      this.employeDialog = false;
    }
  }

  deleteRonders(employe: EmployeSociete) {
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimer ' + employe.nom + ' ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.authService.deleteemployebloc(employe.id).subscribe({
          next: () => {
            this.employes.set(this.employes().filter(e => e.id !== employe.id));
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Employé supprimé',
              life: 3000
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Échec de suppression',
              life: 3000
            });
          }
        });
      }
    });
  }

  exportCSV() {
    this.dt.exportCSV();
  }

  findIndexById(id: number): number {
    return this.employes().findIndex(emp => emp.id === id);
  }
}


