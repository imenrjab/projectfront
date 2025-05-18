export interface Vacation {
     id: number;
  shift: Shift;
  date: string; // ou LocalDate si vous utilisez une librairie de date
  equipeId: number;
  equipeNom: string;
  posteId: number;
  posteCode: string;
  userId: number;
  userNomComplet: string;
  groupeId: number;
  groupeNom: string;
}


export enum Shift {
  V06_18 = 'V06_18',                            

  V18_06 = 'V18_06'
}


export interface VacationForm {
  shift: Shift;
  date: string;
  equipeId: number;
  posteId: number;
  userId: number;
  groupeId: number;
}


