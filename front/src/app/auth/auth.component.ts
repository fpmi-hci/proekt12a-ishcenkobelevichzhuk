import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UnauthorizedUser} from "../domain/unauthorized-user";
import {RegisterUser} from "../domain/register-user";
import {AuthService} from "../service/auth.service";
import {pipe} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService,private router:Router) {
    this.isEmpty = true;
    this.isSignIn = false;
    this.isSignUp = false;
    this.unauthorizedUser = new UnauthorizedUser();
    this.registerUser = new RegisterUser();
  }

  ngOnInit(): void {
  }

  signInForm =
    this.fb.nonNullable.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

  signUpForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(".*")]],//TODO fix pattern
    email: ['', [Validators.required, Validators.email]],
    card: ['', [Validators.required, Validators.pattern(".*")]],//TODO fix pattern
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
    repeat_password: ['', [Validators.required]],
  })

  registerUser: RegisterUser;

  unauthorizedUser: UnauthorizedUser;

  onSignIn(): void {
    this.isEmpty = false;
    this.isSignIn = true;
    this.isSignUp = false;
  }

  onSignUp(): void {
    this.isEmpty = false;
    this.isSignUp = true;
    this.isSignIn = false;
  }

  onSignInSubmit(): void {
    this.unauthorizedUser = Object.assign(this.unauthorizedUser, this.signInForm.value)
    console.log(this.unauthorizedUser)
    //send request to backend
    this.authService.signIn(this.unauthorizedUser).subscribe(user => {
        console.log(user)
        this.router.navigate(["portal"])
      }
    )
    //redirect to main page
  }

  onSignUpSubmit(): void {
    this.registerUser = Object.assign(this.registerUser, this.signUpForm.value)
    console.log(this.registerUser)
    //send request to backend
  }

  isEmpty: boolean;
  isSignIn: boolean;
  isSignUp: boolean;
}
