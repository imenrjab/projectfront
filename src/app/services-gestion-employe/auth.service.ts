import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ronders } from '../models-gestion-employe/Ronders';
import { Rondersemp } from '../models-gestion-employe/Rondersemp';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  baseUrl = environment.API_BASE_URL+ "/auth"
  baseUrll = environment.API_BASE_URL+ "/ronders"

 
 
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
  signUpRonders(user: Ronders): Observable<any>
  {
      return this._httpClient.post(`${this.baseUrl}/registerRonders`, user); 
  }








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



updatemploye(registerRequest: Rondersemp):Observable<any>{
  const url=this.baseUrll+"/updaterendors"

  return this._httpClient.post<any>(url,registerRequest)
}


getemployebyId(id: number): Observable<any> {
  return this._httpClient.get<any>(`${this.baseUrl}/employe_by_id/${id}`);
}
getAllemploye(): Observable<Rondersemp[]> {
  return this._httpClient.get<Rondersemp[]>(`${this.baseUrll}/lister_employe`);
}
deleteemploye(id: number): Observable<void> {
  return this._httpClient.delete<void>(`${this.baseUrll}/delete/${id}`);
}



/*

getProfById(id: number): Observable<Addprof> {
  return this._httpClient.get<Addprof>(`${this.baseUrlcontprof}/Getbyidprof/${id}`);
}
getProfauth(id: number): Observable<any> {
  return this._httpClient.get<any>(`${this.baseUrlcontuser}/findProfbyid/${id}`);
}
deleteProf(id: number): Observable<void> {
  return this._httpClient.delete<void>(`${this.baseUrlcontprof}/delete/${id}`);
}
getAllprof(): Observable<ProfesseurDto[]> {
  return this._httpClient.get<ProfesseurDto[]>(`${this.baseUrlcontprof}/findall`);
}
getRole = () => {
  var user: any;
  user = localStorage.getItem('accesstoken');
  let token = JSON.parse(user).token;
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  return decodedToken.authorities[0].authority;
}
/*getuserByRole1(userrole: UserRole):Observable<UserDto[]>{
  const url=this.baseUrl+"/listeuserbyrole"
  return this.httpClient.post<UserDto[]>(url,userrole)
}*/
/*getuseralluser(): Observable<UserDto[]> {
  return this.httpClient.get<UserDto[]>(`${this.baseUrl}/listeuserbyrole`)
  .pipe(
    map((response:any) => response as UserDto[])
  );
}*/








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

}
