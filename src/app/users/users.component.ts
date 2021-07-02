import { Component, OnInit } from '@angular/core';
import {User} from "../User";
import {UserDataService} from "../user-data.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  static users: User[] = []

  getStaticUsers(){
    return UsersComponent.users;
  }

  selectedUser?: User;
  onSelect(user: User): void {
    this.selectedUser = user;
  }

  getUsers(): void{
    this.userDataService.getUsers()
      .subscribe(users => UsersComponent.users=users)
  }

  add(name: string, phone: string, email: string, address: string) {
    name = name.trim();
    phone = phone.trim();
    email = email.trim();
    address = address.trim();
    if (!name) { return; }
    let id = UsersComponent.users.length;
    this.userDataService.addUser({id, name, email, phone, address} as User)
      .subscribe(user => {
        UsersComponent.users.push(user);
      });
  }

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.getUsers();
  }

}
