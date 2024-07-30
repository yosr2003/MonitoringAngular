import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage-service.service';
import { Utilisateur } from './utilisateur';
import { Observable } from 'rxjs';
import { PasswordUpdateRequest } from './password-update-request';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userUrl: string = 'http://localhost:8090/api/auth';

  constructor(private httpClientauth: HttpClient, private sessionStorage:TokenStorageService) {}
  private isFirstLogin = true;
  isFirstTimeLogin(): boolean {
    return this.isFirstLogin;
  }

  // Méthode pour définir que ce n'est plus le premier login après changement de mot de passe
  setFirstTimeLoginCompleted(): void {
    this.isFirstLogin = false;
  }


  signup(user: Utilisateur) {
    return this.httpClientauth.post(this.userUrl + '/signup', user);
  }
  login(user: Utilisateur) {
    return this.httpClientauth.post(this.userUrl + '/login', user);
  }

  logout() {
    this.sessionStorage.signOut(); // Appel de la méthode signOut() du TokenStorageService
  }
  loggedIn(){
    return !!this.sessionStorage.getToken();
  }

  isAdmin(){
    //ngIf----------------------------------------------------------*********************************

    if((this.sessionStorage.getUser().roles)=="ROLE_ADMIN")
    return true
    else 
    return false
  }


  updatePassword(passwordUpdateRequest: PasswordUpdateRequest): Observable<any> {
    return this.httpClientauth.post(`${this.userUrl}/update-password`, passwordUpdateRequest);
  }


}
