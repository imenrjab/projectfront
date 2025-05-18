import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { EmployeSociete } from '../models-gestion-employe/EmployeSociete';



export interface Vacation {
  id: number;
  date: string;
  shift: Shift;
  equipe: Equipe;
  postes: Postes;
  user: EmployeSociete;
}


export interface Equipe {
  id: number;
  nom: string;
  users: EmployeSociete[];
}


export interface Postes {
  id: number;
  nom: string;
  description: string;
}


export enum Shift {
  JOV06_18UR = 'V06_18',
  V18_06 = 'V18_06'   ,

}


@Injectable({
  providedIn: 'root'
})
export class VacationService {
  private apiUrl = `${environment.API_BASE_URL}/vacations`;


  constructor(private http: HttpClient) { }


  /**
   * Génère un planning mensuel pour les groupes spécifiés
   * @param year Année du planning
   * @param month Mois du planning (1-12)
   * @param groupeIds Liste des IDs des groupes
   * @returns Observable avec la liste des vacations générées
   */
  generateMonthlySchedule(year: number, month: number, groupeIds: number[]): Observable<Vacation[]> {
  return this.http.post<Vacation[]>(
    `${this.apiUrl}/generate/${year}/${month}`,
    groupeIds // corps de la requête (List<Long>)
  );
}





  /**
   * Vérifie la disponibilité d'un agent
   * @param agentId ID de l'agent
   * @param date Date à vérifier
   * @param shift Shift à vérifier
   * @returns Observable avec le résultat de la vérification
   */
  checkAgentAvailability(agentId: number, date: Date, shift: Shift): Observable<boolean> {
    const params = new HttpParams()
      .set('agentId', agentId.toString())
      .set('date', date.toISOString().split('T')[0])
      .set('shift', shift);


    return this.http.get<boolean>(`${this.apiUrl}/availability`, { params });
  }


  /**
   * Récupère le planning mensuel d'un groupe
   * @param groupeId ID du groupe
   * @param year Année du planning
   * @param month Mois du planning (1-12)
   * @returns Observable avec la liste des vacations
   */
  getMonthlyScheduleByGroup(groupeId: number, year: number, month: number): Observable<Vacation[]> {
    return this.http.get<Vacation[]>(
      `${this.apiUrl}/group/${groupeId}/${year}/${month}`
    );
  }


  /**
   * Récupère les vacations pour une date spécifique
   * @param date Date à rechercher
   * @returns Observable avec la liste des vacations
   */
  getVacationsByDate(date: Date): Observable<Vacation[]> {
    const dateStr = date.toISOString().split('T')[0];
    return this.http.get<Vacation[]>(`${this.apiUrl}/date/${dateStr}`);
  }


  /**
   * Met à jour une vacation existante
   * @param id ID de la vacation
   * @param vacationDetails Nouvelles données de la vacation
   * @returns Observable avec la vacation mise à jour
   */
  updateVacation(id: number, vacationDetails: Partial<Vacation>): Observable<Vacation> {
    return this.http.put<Vacation>(
      `${this.apiUrl}/${id}`,
      vacationDetails
    );
  }


  /**
   * Supprime une vacation
   * @param id ID de la vacation à supprimer
   * @returns Observable vide
   */
  deleteVacation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  /**
   * Récupère toutes les vacations entre deux dates
   * @param startDate Date de début
   * @param endDate Date de fin
   * @returns Observable avec la liste des vacations
   */
  getVacationsBetweenDates(startDate: Date, endDate: Date): Observable<Vacation[]> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString().split('T')[0])
      .set('endDate', endDate.toISOString().split('T')[0]);


    return this.http.get<Vacation[]>(`${this.apiUrl}/between`, { params });
  }
  getAllvacation(): Observable<Vacation[]> {
      return this.http.get<Vacation[]>(`${this.apiUrl}/listervacation`);
    }
}




