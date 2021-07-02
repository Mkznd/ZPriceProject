import { Component, OnInit } from '@angular/core';
import {User} from "../User";
import {UserDataService} from "../user-data.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = []

  getUsers(): void{
    this.userDataService.getHeroes()
      .subscribe(users => this.users=users)
  }

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.getUsers();
  }

}
