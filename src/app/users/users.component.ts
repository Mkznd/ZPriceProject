import {Component, OnInit} from '@angular/core';
import {User} from "../User";
import {UserDataService} from "../user-data.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  static users: User[] = [];
  public userForm!: FormGroup;

  getStaticUsers() {
    return UsersComponent.users;
  }

  selectedUser?: User;

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  getUsers(): void {
    this.userDataService.getUsers()
      .subscribe(users => UsersComponent.users = users)
  }

  add(name: string, phone: string, email: string, address: string) {
    name = name.trim();
    phone = phone.trim();
    email = email.trim();
    address = address.trim();
    if (!name) {
      return;
    }
    let id = UsersComponent.users.length;
    this.userDataService.addUser({id, name, email, phone, address} as User)
      .subscribe(user => {
        UsersComponent.users.push(user);
      });
  }

  constructor(private userDataService: UserDataService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.userForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('[0-9 ]{10}')]),
      email: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    });
  }

  get name() {
    return this.userForm.get("name")
  }

  get email() {
    return this.userForm.get("email")
  }

  get phone() {
    return this.userForm.get("phone")
  }

  get address() {
    return this.userForm.get("address")
  }
}
