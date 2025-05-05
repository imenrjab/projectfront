import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CongeDto } from '../models-gestion-employe/congedto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Periodeconge } from '../models-gestion-employe/periodeconge';

@Injectable({
  providedIn: 'root'
})
export class GestioncongeService {

    baseUrll = environment.API_BASE_URL+ "/conges"
  


  constructor(private http: HttpClient) { }


  initializeLeaveBalance(employeeId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrll}/initialize/${employeeId}`, {});
  }

      /*demande de conge employe*/
      gtCongesParEemployecon(): Observable<CongeDto[]> {
        return this.http.get<CongeDto[]>(`${this.baseUrll}/employeconnecter`);
      }
  demanderConge(prconge: CongeDto): Observable<CongeDto> {
    return this.http.post<CongeDto>(`${this.baseUrll}/demande`,prconge);
  }
  updateDemandeParEmploye(idConge: number, conge: Periodeconge): Observable<CongeDto> {
    return this.http.put<CongeDto>(`${this.baseUrll}/api/conges/employe/${idConge}/update`, conge);
  }
  
  
  

  approuverConge(requestId: number): Observable<CongeDto> {
    return this.http.put<CongeDto>(`${this.baseUrll}/approbation/${requestId}`, {});
  }


  getSoldeDisponible(employeeId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrll}/solde/${employeeId}`);
  }


  getCongesParEmploye(employeeId: number): Observable<CongeDto[]> {
    return this.http.get<CongeDto[]>(`${this.baseUrll}/employe/${employeeId}`);
  }


  getAllConges(): Observable<CongeDto[]> {
    return this.http.get<CongeDto[]>(`${this.baseUrll}/all`);
  }


  refuserConge(requestId: number, raison: string): Observable<CongeDto> {
    return this.http.put<CongeDto>(`${this.baseUrll}/refus/${requestId}?raison=${raison}`, {});
  }


  /*annulerConge(requestId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrll}/annulation/${requestId}`);
  }*/
}
  

