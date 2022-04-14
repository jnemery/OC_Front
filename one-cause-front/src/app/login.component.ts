import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';

import { User } from './_models/user';

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

  signin: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(3)]),
    token:    new FormControl('', [Validators.required, Validators.min(4)]),
  });

  matcher = new MyErrorStateMatcher();

  get usernameInput() {
    return this.signin.get('username');
  }
  get passwordInput() {
    return this.signin.get('password');
  }

  setUsername() {
    this.currentUser.username = this.usernameInput?.value;
  }

  setPassword() {
    this.currentUser.password = this.passwordInput?.value;
  }

  @Output() loginRequest = new EventEmitter<User>();

  login() {
    this.loginRequest.emit(this.currentUser);
    this.setUsername();
    this.setPassword();
    console.log('username: ' + this.currentUser.username);
    console.log('password: ' + this.currentUser.password);
    
  }

}
