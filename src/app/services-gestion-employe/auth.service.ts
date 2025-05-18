import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ronders } from '../models-gestion-employe/Ronders';
import { EmployeSociete } from '../models-gestion-employe/EmployeSociete';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  baseUrl = environment.API_BASE_URL+ "/auth"
  baseUrll = environment.API_BASE_URL+ "/ronders"
baseUrll2 = environment.API_BASE_URL+ "/chefdequart"
baseUrll3 = environment.API_BASE_URL+ "/chefdebloque"

 
 
 
  private router = inject(Router);
private _httpClient = inject(HttpClient);
private _authenticated: boolean = false;


// -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------




  /**
   * Setter & getter for access token
   */
  set accessToken(token: string)
  {
      localStorage.setItem('accessToken', token);
  }




  get accessToken(): string
  {
      return localStorage.getItem('accessToken') ?? '';
  }




  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

 
  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: { email: string; password: string }): Observable<any> {
      // Throw error, if the user is already logged in
      if (this._authenticated) {
          return throwError(() => 'User is already logged in.');
      }




      return this._httpClient
          .post(`${this.baseUrl}/authenticate`, credentials)
          .pipe(
              switchMap((response: any) => {
                console.log(response)
                  // Store the access token in the local storage
                  this.accessToken = response.accessToken;




                  // Set the authenticated flag to true
                  this._authenticated = true;




                  // Store the user on the user service
                  // this._userService.user = response.user;




                  // Return a new observable with the response
                  return of(response);
              })
          );
  }




  /**
   * Forgot password
   *
  */
 /*


  forgotPasswordgivemaili(email: Resetpwemail): Observable<string> {
    return this._httpClient.post<string>(`${this.baseUrl}users/resetrequestpassword`,email);
}












/**
 * Otp Verification
 *
 * @param email
 * @param otp
 */


/*


otpVerificationgiveotp(emailotp:ActionRsetpW):Observable<any> {
    return this._httpClient.post(`${this.baseUrl}users/verifyOtp`,emailotp)
}*/




/**
 * Reset password
 *
 * @param resetPassword
 * @param email
 */
/*
resetPasswordfinal(resetPassword: ResetPassword): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}users/resetPassword`,resetPassword)
   
}*/




/**
 * Forgot password
 *
 * @param email
 */
/*
changePassword(changePassword: ChangePassword): Observable<any> {
    return this._httpClient.patch(`${this.baseUrl}users/changepassword`,changePassword);
}
 */










  /**
* Sign up
*
* @param Parent
*/








      logout(){
          this._authenticated=false;
          localStorage.clear();
      }








      /////auth
     
isUserAuthenticated():boolean{
  if (localStorage.getItem ("accesstoken")){
    return true;
  }
  this.router.navigate(["/signin"])
return false;
}
/* login(authenticationRequest : AuthenticationRequest):Observable<AuthenticationResponse>{
  const url=this.baseUrl+"/authenticate"
  return this.httpClient.post<AuthenticationResponse>(url,authenticationRequest)
}*/


/*
ajouterprof(registerRequest: Addprof):Observable<Responses>{
  const url=this.baseUrl+"/registerprofesseur"
  return this._httpClient.post<Responses>(url,registerRequest)
}*/

// bloc rondres
signUpRonders(user: Ronders): Observable<any>
{
    return this._httpClient.post(`${this.baseUrl}/registerRonders`, user); 
}

updatemploye(registerRequest: EmployeSociete):Observable<any>{
  const url=this.baseUrll+"/updaterendors"

  return this._httpClient.put<any>(url,registerRequest)
}



getemployebyId(id: number): Observable<any> {
  return this._httpClient.get<any>(`${this.baseUrl}/employe_by_id/${id}`);
}
getAllemploye(): Observable<EmployeSociete[]> {
  return this._httpClient.get<EmployeSociete[]>(`${this.baseUrll}/lister_employe`);
}
deleteemploye(id: number): Observable<void> {
  return this._httpClient.delete<void>(`${this.baseUrll}/delete/${id}`);
}




//chef de qurt
getemployequartbyId(id: number): Observable<any> {
  return this._httpClient.get<any>(`${this.baseUrll2}/getbyid/${id}`);
}
getAllemployequart(): Observable<EmployeSociete[]> {
  return this._httpClient.get<EmployeSociete[]>(`${this.baseUrll2}/lister`);
}
deleteemployequart(id: number): Observable<void> {
  return this._httpClient.delete<void>(`${this.baseUrll2}/delet/${id}`);
  
}
updatemployequart(registerRequest: EmployeSociete):Observable<any>{
  const url=this.baseUrll2+"/update"

  return this._httpClient.post<any>(url,registerRequest)
}
signUpchefdequart(user: Ronders): Observable<any>
{
    return this._httpClient.post(`${this.baseUrl}/registerChefdequart`, user); 
}

//chef de bloc
getemployeblocbyId(id: number): Observable<any> {
  return this._httpClient.get<any>(`${this.baseUrll3}/getbyid/${id}`);
}
getAllemployebloc(): Observable<EmployeSociete[]> {
  return this._httpClient.get<EmployeSociete[]>(`${this.baseUrll3}/lister`);
}
deleteemployebloc(id: number): Observable<void> {
  return this._httpClient.delete<void>(`${this.baseUrll3}/Delete/${id}`);
  
}
updatemployebloc(registerRequest: EmployeSociete):Observable<any>{
  const url=this.baseUrll3+"/update"

  return this._httpClient.post<any>(url,registerRequest)
}











}








/*
finduserbyid(id: number):Observable<Addprof> {
  return this._httpClient.get<Addprof>(`${this.baseUrl}/findbyid/${id}`)
  .pipe(
    map((response:any) => response as Addprof)
  );  
}
desactivebyid(userId: Addprof): Observable<any> {
  const url = `${this.baseUrl}/savededesactivate`;
  return this._httpClient.post(url, userId );
}
activebyid(userId: Addprof): Observable<any> {
  const url = `${this.baseUrl}/savedeactivate`;
  return this._httpClient.post(url,  userId );
}
/* setUserToken (authenticationResponse: AuthenticationResponse){
  localStorage.setItem("accessToken",JSON.stringify(authenticationResponse))
const token = authenticationResponse.accessToken;
if (token) {
const decodedToken = jwtDecode(token) as any;
const fullname = decodedToken.fullname;
localStorage.setItem("fullname", fullname);
const userId = decodedToken.userId;
localStorage.setItem("userId", userId);
const role = decodedToken.role;
localStorage.setItem("role", role);




console.log("uuuuuuuuuuuuuuuuuuuuuuuuuu")
console.log("HHHHHHHHH",decodedToken)
  }
}*/
/*activebyid(userId: number): Observable<UserDto> {
  return this.httpClient.post<UserDto>(`${this.baseUrl}/savedeactivate/${userId}`, {});
}*/
/*desactivebyid(userId: number):Observable<UserDto> {
  return this.httpClient.post<UserDto>(`${this.baseUrls}/savededesactivate/${userId}`, {})
  .pipe(
    map((response:any) => response as UserDto)
  );  
}*/


