import { UserPostoji } from './userPostoji.service';
import { UsersRegister } from './userRegister.service';
/* import { AuntetifikacijaService } from './atentifikacija.service'; */
import { NewSongService } from './newsongs.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { StartPageComponent } from './start-page/start-page.component';
import { SongsComponent } from './songs/songs.component';
import { InsertComponent } from './insert/insert.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { DeletSongsComponent } from './songs/delet-songs/delet-songs.component';
import { RegisterComponent } from './login/register/register.component';
import { SendMailComponent } from './about/send-mail/send-mail.component';



const appRouts: Routes = [
  {path: "", component: StartPageComponent},
  {path: "Songs", component: SongsComponent},
  {path: "Insert", component: InsertComponent},
  {path: "About", component: AboutComponent},
  {path: "Login", component: LoginComponent},
  {path: "Delete", component: DeletSongsComponent},
  {path: "Register", component: RegisterComponent},
  {path: "SendMail", component: SendMailComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    StartPageComponent,
    SongsComponent,
    InsertComponent,
    AboutComponent,
    LoginComponent,
    DeletSongsComponent,
    RegisterComponent,
    SendMailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRouts),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [NewSongService, UsersRegister, UserPostoji, /* AuntetifikacijaService */],
  bootstrap: [AppComponent]
})
export class AppModule { }
