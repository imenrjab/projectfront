import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services-gestion-employe/auth.service';
import { Ronders } from '../../models-gestion-employe/Ronders';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { CongeService } from '../../services-gestion-employe/conge.service';

@Component({
  selector: 'app-ajouteemp',
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, ReactiveFormsModule, RouterModule, RippleModule,CommonModule],
  templateUrl: './ajouteemp.component.html',
  styleUrl: './ajouteemp.component.scss'
})
export class AjouteempComponent implements OnInit {
  registerForm: FormGroup;
  private authService = inject(AuthService);
  // private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  toastr: any;
poste : string[]=["T_G","T_V","AUX","HRSG"]



  constructor( private congeService: CongeService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      
      
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        matrecule: ['', Validators.required],
        degre: ['', Validators.required],
        tele: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
        adress: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        poste: ['', [Validators.required]],

      
        
      });

     
    } 
 register(): void {
  const newUser: Ronders = this.registerForm.value;

  if (newUser) {
    this.authService.signUpRonders(newUser).subscribe({
      next: (response) => {
        this.toastr.success('Utilisateur enregistré avec succès !');

        // 🟢 Appel pour initialiser le solde
        this.congeService.initializeSolde(response.id).subscribe({
          next: () => {
            this.toastr.info('Solde de congé initialisé.');
          },
          error: () => {
            this.toastr.warning('Utilisateur enregistré, mais échec de l\'initialisation du solde.');
          }
        });
      },
      error: (error) => {
        this.toastr.error('Erreur lors de l\'enregistrement.', error);
      }
    });
  } else {
    this.toastr.error('Veuillez remplir tous les champs correctement.');
  }
}
}
