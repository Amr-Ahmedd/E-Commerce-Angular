import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorage } from '../storage/user-storage'; 
const BASIC_URL = 'http://localhost:8081/';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient, private userStorage: UserStorage) {}
  
  register(signupRequest: any) {
    return this.http.post(BASIC_URL+"sign-up", signupRequest);
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { username, password };

    return this.http
      .post(BASIC_URL + 'authenticate', body, { headers, observe: 'response' })
      .pipe(
        map((res: any) => {
          const authHeader =
            res.headers.get('Authorization') || res.headers.get('authorization');

          const token = authHeader?.startsWith('Bearer ')? authHeader.substring(7): authHeader;
          const user = res.body;

          if (token && user) {
            this.userStorage.saveToken(token);
            this.userStorage.saveUser(user);
            return true;
          }

          return false;
        })
      );
  }
}

  

