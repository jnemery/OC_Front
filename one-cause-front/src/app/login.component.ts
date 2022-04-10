import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';

import { User } from './_models/user';

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
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(3)]),
  });
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

    
  }

//  constructor(private authService: AuthenticationService) {
//    this.authService.currentUser.subscribe(x => this.currentUser = x);
//  }
}
