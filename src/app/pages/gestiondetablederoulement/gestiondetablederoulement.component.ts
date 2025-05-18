import { Component } from '@angular/core';
import { Vacation, VacationService } from '../../services-gestion-employe/gestionroulement.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';


@Component({
  selector: 'app-gestiondetablederoulement',
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
      TagModule,
      InputIconModule,
      IconFieldModule,
      ConfirmDialogModule,
    DropdownModule,
    ConfirmDialogModule],
  templateUrl: './gestiondetablederoulement.component.html',
  styleUrl: './gestiondetablederoulement.component.scss'
})
export class GestiondetablederoulementComponent {
 selectedMonth: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();
  selectedGroupId: number  = 1;
    planifierGroupId: number [] = [1,2,3];

  vacations: Vacation[] = [] ;
  isLoading = false;


 monthOptions = [
  { label: 'Janvier', value: 1 },
  { label: 'Février', value: 2 },
  { label: 'Mars', value: 3 },
  { label: 'Avril', value: 4 },
  { label: 'Mai', value: 5 },
  { label: 'Juin', value: 6 },
  { label: 'Juillet', value: 7 },
  { label: 'Août', value: 8 },
  { label: 'Septembre', value: 9 },
  { label: 'Octobre', value: 10 },
  { label: 'Novembre', value: 11 },
  { label: 'Décembre', value: 12 }
];





  constructor(private vacationService: VacationService) {}


  ngOnInit(): void {
   // this.loadPlanning();
   this.loadAllPlanning()
  }



  loadPlanning(): void {
    this.isLoading = true;
    this.vacationService.getMonthlyScheduleByGroup(this.selectedGroupId, this.selectedYear, this.selectedMonth)
      .subscribe({
        next: (data) => {
          this.vacations = data;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }
  loadAllPlanning(): void {
    this.isLoading = true;
    this.vacationService.getAllvacation()
      .subscribe({
        next: (data) => {
          this.vacations = data;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }


  generatePlanning(): void {
    console.log(this.selectedMonth)
    this.vacationService.generateMonthlySchedule(this.selectedYear, this.selectedMonth, this.planifierGroupId)
      .subscribe({
        next: (data) => {
          this.vacations = data;
        },
        error: () => {}
      });
  }
}




