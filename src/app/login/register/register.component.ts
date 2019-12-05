import { UsersRegister } from './../../userRegister.service';
import { Http, Response } from '@angular/http';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  
  users = [];
  provera: boolean = false;
  registerForm: FormGroup;

  constructor(private registerUser: Http, private newUser: UsersRegister) { }

  ngOnInit() {
    this.initForm();
    this.registerUser.get('https://ren-musics.firebaseio.com/users.json')
    .subscribe(
      (res: Response) => {
        const data = res.json();
        this.newUser.users = [];
        data.forEach((el)=>{

          this.newUser.newUser(el.e, el.p);
              
       })
      }
    );
    
  }

  onSubUser(){
    

    this.newUser.users.forEach((el) => {
      if(this.registerForm.value['email'] === el.e){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'A user under this email already exists',
        })
        this.provera = true;
      }

    })

    if(this.provera === false){
      this.newUser.newUser(this.registerForm.value['email'],this.registerForm.value['password']);
      this.registerUser.put('https://ren-musics.firebaseio.com/users.json', this.newUser.users.slice())
      .subscribe(
        (response) =>{}
      ); 

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'You registered success',
        showConfirmButton: false,
        timer: 1500
      })
      
      this.provera = false; 
    }

    
  }
  

  private initForm(){
    let Email = '';
    let Password = '';


    this.registerForm = new FormGroup({
      'email': new FormControl(Email, Validators.required),
      'password': new FormControl(Password, Validators.required)
    })
  }

}
