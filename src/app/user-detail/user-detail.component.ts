import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../user-data.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../User";
import {UsersComponent} from "../users/users.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {waitForAsync} from "@angular/core/testing";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;
  id: number = Number(this.route.snapshot.paramMap.get('id'));
  public userForm!: FormGroup;

  getUser(): void {
    this.userDataService.getUser(this.id)
      .subscribe(user => {
        this.user = user;
        this.userForm.get('name')?.setValue(user.name);
        this.userForm.get('email')?.setValue(user.email);
        this.userForm.get('phone')?.setValue(user.phone);
      });
  }

  delete(user: User): void {
    UsersComponent.users = UsersComponent.users.filter(h => h !== user);
    this.userDataService.deleteUser(user.id).subscribe();
  }

  constructor(private route: ActivatedRoute,
              private userDataService: UserDataService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getUser();
    this.userForm = this.formBuilder.group({
      name: new FormControl(this.user?.name,[Validators.required]),
      phone: new FormControl('',[Validators.required, Validators.pattern('[0-9 ]{11}')]),
      email: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required])
    });
  }
  get name(){return this.userForm.get("name")}
  get email(){return this.userForm.get("email")}
  get phone(){return this.userForm.get("phone")}
  get address(){return this.userForm.get("address")}

}
