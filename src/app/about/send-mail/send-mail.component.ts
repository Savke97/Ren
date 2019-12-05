import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {


  meilSend: FormGroup;
  constructor() { }

  ngOnInit() {
    
  }

  onLogIn(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
   /*  this.logIn.logInUser(email, password); */
  }

}
