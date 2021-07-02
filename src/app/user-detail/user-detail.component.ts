import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../user-data.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../User";
import {UsersComponent} from "../users/users.component";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;
  id: number = Number(this.route.snapshot.paramMap.get('id'));
  getUser(): void {
    this.userDataService.getUser(this.id)
      .subscribe(user => this.user = user);
  }

  delete(user: User): void {
    UsersComponent.users = UsersComponent.users.filter(h => h !== user);
    this.userDataService.deleteUser(user.id).subscribe();
  }

  constructor(private route: ActivatedRoute,
              private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.getUser();
  }

}
