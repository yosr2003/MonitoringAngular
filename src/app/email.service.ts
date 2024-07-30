import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://localhost:8090/api/notification/email'; // Adjust the URL to your backend

  constructor(private http: HttpClient) { }

  saveEmail(to: string, subject: string, body: string): Observable<any> {
    const emailRequest = {
      to: to,
      subject: subject,
      content: { type: 'text/html', value: body }
    };
    return this.http.post(this.apiUrl, emailRequest);
  }
}
