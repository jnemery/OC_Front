import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';

import {MatDialog} from '@angular/material/dialog';
import { AlertComponent } from './alert/alert.component';
import { User } from './_models/user';
import { HttpClient } from '@angular/common/http';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'one-cause-front';
  currentUser: User = new User;
  hide = true;
  headers = {'content-type': 'application/json'}

  constructor(private http: HttpClient, private dialog: MatDialog) {
    
  }

  signin: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(3)]),
    token:    new FormControl('', [Validators.required, Validators.pattern('^[0-9]{4}$')]),
  });

  matcher = new MyErrorStateMatcher();

  setUsername() {
    this.currentUser.username = this.signin.get('username')?.value;
  }

  setPassword() {
    this.currentUser.password = this.signin.get('password')?.value;
  }

  setToken() {
    this.currentUser.token = this.signin.get('token')?.value;
  }

  submitCredentials() {
    this.setUsername();
    this.setPassword();
    this.setToken();
    console.log('username: ' + this.currentUser.username);
    console.log('password: ' + this.currentUser.password);
    console.log('token: ' + this.currentUser.token);
    
    this.http.post<any>("http://localhost:8080/login", this.currentUser, {'headers': this.headers}).subscribe(data => {
      this.currentUser.valid = data["valid"];
      if (this.currentUser.valid){
        location.href = 'http://onecause.com'
      } else{
        this.dialog.open(AlertComponent, { data: {
          alert: "INVALID LOGIN"
        }});
      }
    })
  }

}
