import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateur } from './utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl: string = 'http://localhost:8090/api/users';

  constructor(private httpClient: HttpClient) {}


  editUser(user: Utilisateur, id: number) {
    return this.httpClient.put(this.userUrl +'/'+id ,user);
  }

  getAllUseres() {
    return this.httpClient.get(this.userUrl);
  }

  getUserById(idUser: number) {
    return this.httpClient.get(this.userUrl + '/'+idUser);
  }

  deleteUser(idUser: number) {
    return this.httpClient.delete(this.userUrl +'/'+ idUser);
  }


 searchByMail(email:string)
 {
  return this.httpClient.get(this.userUrl+ '/mail/'+email);
 }
}
