import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../user-data.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../User";
import {UsersComponent} from "../users/users.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user?: User;
  id: number = Number(this.route.snapshot.paramMap.get('id'));
  public userForm!: FormGroup;

  getUser(): void {
    this.userDataService.getUser(this.id)
      .subscribe(user => {
        this.user = user;
        this.fillUserDetailForm(user);
      });
  }

  private fillUserDetailForm(user: User) {
    this.userForm.get('name')?.setValue(user.name);
    this.userForm.get('email')?.setValue(user.email);
    this.userForm.get('phone')?.setValue(user.phone);
    this.userForm.get('address')?.setValue(user.address);
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
      name: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required, Validators.pattern('[0-9 ]{10}')]),
      email: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required])
    });
  }
  get name(){return this.userForm.get("name")}
  get email(){return this.userForm.get("email")}
  get phone(){return this.userForm.get("phone")}
  get address(){return this.userForm.get("address")}

  update(): void {
    if(!this.checkForm()) return;
    this.setUserValues();
    this.userDataService.updateUser(this.user!).subscribe()
  }

  private setUserValues() {
    this.user!.name = this.name?.value;
    this.user!.email = this.email?.value;
    this.user!.phone = this.phone?.value;
    this.user!.address = this.address?.value;
  }

  private checkForm() {
    return this.name?.valid && this.phone?.valid && this.email?.valid && this.address?.valid;
  }
}
