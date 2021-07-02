import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {Routes} from "@angular/router";
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
