import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-chefdequart',
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, ReactiveFormsModule, RouterModule, RippleModule,CommonModule],
  templateUrl: './chefdequart.component.html',
  styleUrl: './chefdequart.component.scss'
})
export class ChefdequartComponent    {
//   shifts = [
//     { date: '2025-04-22', name: 'Ali Ben Salah', role: 'Surveillant', start: '08:00', end: '16:00' },
//     { date: '2025-04-22', name: 'Sara Messaoud', role: 'Technicien', start: '16:00', end: '00:00' }
//   ];

//   // Liste des demandes de congé
//   demandes = [
//     { nom: 'Karim Maatouk', date: '2025-04-25' },
//     { nom: 'Nadia Barkaoui', date: '2025-04-28' }
//   ];

//   // Nouvel élément pour ajout
//   nouveauShift = {
//     nom: '',
//     date: '',
//     role: '',
//     start: '',
//     end: ''
//   };

//   // Ajouter un roulement
//   ajouterRoulement() {
//     if (
//       this.nouveauShift.nom &&
//       this.nouveauShift.date &&
//       this.nouveauShift.role &&
//       this.nouveauShift.start &&
//       this.nouveauShift.end
//     ) {
//       this.shifts.push({
//         name: this.nouveauShift.nom,
//         date: this.nouveauShift.date,
//         role: this.nouveauShift.role,
//         start: this.nouveauShift.start,
//         end: this.nouveauShift.end
//       });

//       // Réinitialiser le formulaire
//       this.nouveauShift = {
//         nom: '',
//         date: '',
//         role: '',
//         start: '',
//         end: ''
//       };
//     }
//   }

//   // Valider une demande de congé
//   validerDemande(demande: any) {
//     // alert(Demande de congé validée pour ${demande.nom});
//     this.demandes = this.demandes.filter(d => d !== demande);
//   }

//   // Rejeter une demande de congé
//   rejeterDemande(demande: any) {
//     // alert(Demande de congé rejetée pour ${demande.nom});
//     this.demandes = this.demandes.filter(d => d !== demande);
//   }
// }
}
