import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CongeDto } from '../models-gestion-employe/congedto';
import { Demandecongeperiode } from '../models-gestion-employe/demandecongeperiode';
import { environment } from '../../environment/environment';
import { EmployeSociete } from '../models-gestion-employe/EmployeSociete';
import { Soldedto } from '../models-gestion-employe/soldedto';


@Injectable({
  providedIn: 'root'
})
export class CongeService {
  private apiUrl =  environment.API_BASE_URL+ "/conges"

  constructor(private http: HttpClient) {}

  initializeSolde(employeeId: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/initialize/${employeeId}`, {});
  }

  demanderConge(demande: CongeDto): Observable<CongeDto> {
    return this.http.post<CongeDto>(`${this.apiUrl}/demande`, demande);
  }

  updateDemandeEmploye(idConge: number, updateData: Demandecongeperiode): Observable<CongeDto> {
    return this.http.put<CongeDto>(`${this.apiUrl}/employe/${idConge}/update`, updateData);
  }

  approuverConge(requestId: number): Observable<CongeDto> {
    return this.http.put<CongeDto>(`${this.apiUrl}/approbation/${requestId}`, {});
  }

  getSoldeDisponible(employeeId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/solde/${employeeId}`);
  }
 


  getCongesParEmploye(employeeId: number): Observable<CongeDto[]> {
    return this.http.get<CongeDto[]>(`${this.apiUrl}/employe/${employeeId}`);
  }

  getCongesEmployeConnecte(): Observable<CongeDto[]> {
    return this.http.get<CongeDto[]>(`${this.apiUrl}/employeconnecter`);
  }

  getAllConges(): Observable<CongeDto[]> {
    return this.http.get<CongeDto[]>(`${this.apiUrl}/all`);
  }
getAllEmployeSociete(): Observable<EmployeSociete[]> {
    return this.http.get<EmployeSociete[]>(`${this.apiUrl}/lister_employe`);
  }
  refuserConge(requestId: number, raison: string): Observable<CongeDto> {
    const params = new HttpParams().set('raison', raison);
    return this.http.put<CongeDto>(`${this.apiUrl}/refus/${requestId}`, {}, { params });
  }

  annulerConge(requestId: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/annulation/${requestId}`, { responseType: 'text' });
  }

  getSoldesByUser(userId: number): Observable<Soldedto[]> {
    return this.http.get<Soldedto[]>(`${this.apiUrl}/user/${userId}`);
  }
}
