import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


  apiUrl = "http://localhost:3000/users";
  authenticateUrl = "http://localhost:3000/users?username=";
  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  authenticate(username: string , password:string): Observable<User[]>{
    return  this.http.get<User[]>(this.authenticateUrl + username + "&password="+password);
  }



}
