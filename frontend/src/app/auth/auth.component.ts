import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthResData } from './auth.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit{
  showLoginForm: boolean = false;
  signupForm: FormGroup = new FormGroup({});
  loginForm: FormGroup = new FormGroup({});
  token!: string;
  error: string = "";
  success: string = "";

  constructor(
    private authService: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'passwords': new FormGroup({
        'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
        'confirm-password': new FormControl(null, Validators.required)
      },this.passwordCheck)
    });
    this.loginForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  onSignup(){
    console.log(this.signupForm)
    this.authService.signup({
      'email': this.signupForm.get('email')?.value,
      'username': this.signupForm.get('username')?.value,
      'name': this.signupForm.get('name')?.value,
      'password': this.signupForm.get('passwords.password')?.value
    })
    .subscribe(
      (data: AuthResData) => {
        this.showLoginForm = true;
        this.success = 'Signup was successfull'
        this.error = "";
        this.signupForm.reset();
      },(errorRes) => {
        this.error = errorRes;
      }
    )
    this.snackBar.open('Signup successful!', 'Close', {
      duration: 3000 // Duration in milliseconds
    });
  }
  
  onLogin(){
    this.authService.login(this.loginForm.value)
    .subscribe(
      (data: AuthResData) => {
        this.token = data.token!
        console.log(data)
        this.router.navigate(['/profile'])
        this.loginForm.reset()
      }, (errorRes) => {
        this.error = errorRes;
      }
    )
    this.loginForm.reset()
  }

  passwordCheck: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup; // Cast control to FormGroup
    
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirm-password')?.value;
  
    if (password !== confirmPassword) {
      return { 'notsame': true };
    }
  
    return null;
  }
}
