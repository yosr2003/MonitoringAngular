import { Injectable } from '@angular/core';
import { Utilisateur } from './utilisateur';
const TOKEN_KEY = "auth-token";
const USER_KEY = "auth-user";  
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService{

 
  signOut(){
    window.sessionStorage.clear();
  } 

public saveToken(token: string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);

  }
public getToken(){
   return sessionStorage.getItem(TOKEN_KEY);

}

public saveUser(user:any) {
  window.sessionStorage.removeItem(USER_KEY);
  window.sessionStorage.setItem(USER_KEY,JSON.stringify(user));
}

public getUser(){
return JSON.parse(sessionStorage.getItem(USER_KEY)!);
}
}