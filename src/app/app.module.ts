import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from "@angular/router";
import {UsersComponent} from './users/users.component';
import {UserDetailComponent} from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
