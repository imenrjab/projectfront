
export interface CongeDto {
  id: number;
  iduser: number;
  date_de_demende: Date; // or Date if you prefer
  dateDebut: Date; // or Date
  dateFin: Date; // or Date
  daysTaken: number;
  status: CongeStatus;
  typeConge: TypeConge;
  approuve: boolean;
}


// If you need to create DTOs for requests
export interface CreateCongeDto {
  iduser: number;
  dateDebut: Date;
  dateFin: Date;
  typeConge: TypeConge;
}


export interface UpdateCongeStatusDto {
  status: CongeStatus;
  rejectionReason?: string;
}
// Enum pour le type de congé
export enum TypeConge {
  ANNUELE = "ANNUELE",
  MALADIE = "MALADIE",
  RHS = "RHS",
  RJM = "RJM",
  DECE = "DECE",
}
	


// Enum pour le statut du congé
export enum CongeStatus {
  EN_ATTENTE = "EN_ATTENTE",
  APPROUVE = "APPROUVE",
  REJETE = "REJETE",
  ANNULE = "ANNULE",
}



