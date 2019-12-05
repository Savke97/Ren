import { UserPostoji } from './../userPostoji.service';
import { UsersRegister } from './../userRegister.service';
import { Http, Response } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  constructor(private logInUser: Http, private logUser: UsersRegister, private logOrNot: UserPostoji) { }

  ngOnInit() {
    this.initForm();

    this.logInUser.get('https://ren-musics.firebaseio.com/users.json')
    .subscribe(
      (res: Response) => {
        const data = res.json();
        this.logUser.users = [];
        data.forEach((el)=>{

          this.logUser.newUser(el.e, el.p);
              
       })
      }
    );
    
  }

  private initForm(){
    let Email = '';
    let Password = '';


    this.loginForm = new FormGroup({
      'email': new FormControl(Email, Validators.required),
      'password': new FormControl(Password, Validators.required)
    })
  }

  onLogIn(){
      for(let i = 0; i<this.logUser.users.length; i++){
        if(this.logUser.users[i].e === this.loginForm.value['email'] && this.logUser.users[i].p === this.loginForm.value['password']){

            this.logOrNot.userJeUlogovan = true;

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'You have successfully loged in',
              showConfirmButton: false,
              timer: 2000
            })

          break;
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User under the name: '+this.loginForm.value['email']+' does not exist!',
          })
        }
      }
  }
  

}
