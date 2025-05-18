import { Component, OnInit } from '@angular/core';
import { CongeDto } from '../../../models-gestion-employe/congedto';
import { CongeService } from '../../../services-gestion-employe/conge.service';

import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-consulter-conge',
  standalone: true,
  templateUrl: './consulter-conge.component.html',
  styleUrls: ['./consulter-conge.component.scss'],
  imports: [
    CommonModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    CalendarModule,
    InputTextModule,
    FormsModule
  ],
  providers: [ConfirmationService]
})
export class ConsulterCongeComponent implements OnInit {
  conges: CongeDto[] = [];
  selectedConges: CongeDto[] = [];
  selectedConge: CongeDto | null = null;
  displayDialog: boolean = false;

  constructor(private congeService: CongeService) {}

  ngOnInit(): void {
    this.loadAllConges();
  }

 loadAllConges(): void {
  this.congeService.getAllConges().subscribe({
    next: (data) => {
      // récupérer le solde pour chaque demande
      data.forEach((conge) => {
        this.congeService.getSoldeDisponible(conge.iduser).subscribe({
          next: (solde) => {
            conge.soldeRestant = solde;
          },
          error: () => {
            conge.soldeRestant = 0; // fallback
          }
        });
      });
      this.conges = data;
    },
    error: () => alert("Erreur lors du chargement des congés")
  });
}


  congeDtos(): CongeDto[] {
    return this.conges;
  }

  onGlobalFilter(dt: any, event: Event): void {
    dt.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onRowSelect(conge: CongeDto): void {
    this.selectedConge = conge;
    this.displayDialog = true;
  }

  approuverConge(): void {
    if (!this.selectedConge) return;
    this.congeService.approuverConge(this.selectedConge.id!).subscribe(() => {
      this.displayDialog = false;
      this.loadAllConges();
    });
  }

  refuserConge(): void {
    if (!this.selectedConge) return;
    const raison = prompt("Raison du refus :");
    if (raison) {
      this.congeService.refuserConge(this.selectedConge.id!, raison).subscribe(() => {
        this.displayDialog = false;
        this.loadAllConges();
      });
    }
  }

  deleteSelectedConge(): void {
    // Optionnel : implémenter suppression groupée
  }

  editconge(conge: CongeDto): void {
    // Optionnel : implémenter la modification par l'admin
  }
}
