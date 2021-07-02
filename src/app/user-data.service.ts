import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "./User";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private userURL = 'http://localhost:3000/users';

  getHeroes(): Observable<User[]> {
    return this.http.get<User[]>(this.userURL)
  }

  constructor(private http: HttpClient) { }
}
