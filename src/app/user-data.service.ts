import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "./User";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  userURL(id?: Number) {
    if (id === null)
      return 'http://localhost:3000/users';
    return `http://localhost:3000/users/${id}`;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userURL())
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.userURL}/${id}`)
  }

  constructor(private http: HttpClient) {
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userURL(), user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.userURL(id));
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.userURL(user.id), user);
  }


}
