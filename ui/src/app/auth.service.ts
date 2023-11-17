// src/app/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // Replace with your Nest.js backend URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    const payload = { username, password };

    return this.http.post<string>(`${this.apiUrl}/login`, payload).pipe(
      tap((token: string) => {
        // Save the token to local storage or a secure storage mechanism
        localStorage.setItem('access_token', token);
      })
    );
  }

  // Add other authentication methods as needed
}
