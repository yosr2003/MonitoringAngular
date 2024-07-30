import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Events } from './event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = 'http://localhost:8090'; // Remplacez par l'URL de votre API backend

  constructor(private http: HttpClient) { }

  // Enregistrer un nouvel événement
  saveEvent(event: Events): Observable<Events> {
    return this.http.post<Events>(`${this.baseUrl}/addEvent`, event);
  }

  // Récupérer tous les événements
  getAllEvents(): Observable<Events[]> {
    // Récupération du token JWT stocké (par exemple, dans localStorage)
    const token = localStorage.getItem('token'); 

    // Création des en-têtes d'authentification
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Events[]>(`${this.baseUrl}/Events`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur : ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Code d'erreur : ${error.status}\nMessage : ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
