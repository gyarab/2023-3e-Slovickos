import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { DataService } from '../../data.service';
import { NameValid, NewEmail, NewName, NewPassword, NewUserName, StrongPasswordRegx, User, UserNameValid } from '../account.model';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrl: './update-account.component.css'
})

export class UpdateAccountComponent implements OnInit {
  newName!: FormControl;
  newUserName!: FormControl;
  newEmail!: FormControl;
  newPassword!: FormControl;
  newPasswordConfirm! : FormControl;
  passwords: FormGroup = new FormGroup({});
  newNameData!: NewName;
  newUserNameData!: NewUserName;
  newEmailData!: NewEmail;
  newPasswordData!: NewPassword;
  passwordStrength: any = {
    uppercase: false,
    lowercase: false,
    digit: false,
    specialCharacter: false,
    minLength: false
  };
  submitted = false;

  constructor(
    private accountService: AccountService,
    private dataService: DataService,
  ){}

  ngOnInit() {
    this.newName = new FormControl<string>('', [Validators.required, Validators.pattern(NameValid)]);
    this.newUserName = new FormControl<string>('', [Validators.required, Validators.pattern(UserNameValid)]);
    this.newEmail = new FormControl<string>('', [Validators.required, Validators.email]);
    this.newPassword = new FormControl<string>('', [Validators.required, Validators.pattern(StrongPasswordRegx)]);
    this.newPasswordConfirm = new FormControl<string>('', Validators.required);
  
    this.passwords = new FormGroup({
      newPassword: this.newPassword,
      newPasswordConfirm: this.newPasswordConfirm
    }, this.passwordCheck);
  
    this.newPassword.valueChanges.subscribe((passwordValue) => {
      this.checkPasswordStrength(passwordValue);
      console.log("Password Strength:", this.passwordStrength);
    });
  }

  updateName() {
    const userId = this.dataService.getCurrentUserId();
    this.newNameData = new NewName(userId, this.newName.value);
    console.log(this.newNameData)
    this.accountService.updateName(this.newNameData).subscribe(
      (userData: User[]) => {
        const userJSON = localStorage.getItem('user');
        if (userJSON !== null) {
          let user = JSON.parse(userJSON);

          const updatedUser = {
              id: user.id,
              name: userData[0].name,
              email: user.email,
              username: user.username,
              token: user.token
          };

          const updatedUserJSON = JSON.stringify(updatedUser);

          localStorage.setItem('user', updatedUserJSON);
        } 
        else {
          console.error('User data not found in localStorage');
      }
    });
    location.reload();
  }

  updateUserName() {
    const userId = this.dataService.getCurrentUserId();
    this.newUserNameData = new NewUserName(userId, this.newUserName.value);
    console.log(this.newUserNameData)
    this.accountService.updateUserName(this.newUserNameData).subscribe(
      (userData: User[]) => {
      const userJSON = localStorage.getItem('user');
      if (userJSON !== null) {
        let user = JSON.parse(userJSON);

        const updatedUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            username: userData[0].username,
            token: user.token
        };

        const updatedUserJSON = JSON.stringify(updatedUser);

        localStorage.setItem('user', updatedUserJSON);
      } 
      else {
        console.error('User data not found in localStorage');
      }
    });
    location.reload();
  }

  updateEmail() {
    const userId = this.dataService.getCurrentUserId();
    this.newEmailData = new NewEmail(userId, this.newEmail.value);
    console.log(this.newEmailData)
    this.accountService.updateEmail(this.newEmailData).subscribe(
      (userData: User[]) => {
        const userJSON = localStorage.getItem('user');
        if (userJSON !== null) {
          let user = JSON.parse(userJSON);
  
          const updatedUser = {
              id: user.id,
              name: user.name,
              email: user.email,
              username: userData[0].username,
              token: user.token
          };
  
          const updatedUserJSON = JSON.stringify(updatedUser);
  
          localStorage.setItem('user', updatedUserJSON);
        } 
        else {
          console.error('User data not found in localStorage');
        }
      });
    location.reload();
  }

  updatePassword() {
    const userId = this.dataService.getCurrentUserId();
    const passwordValue = this.newPassword.value;
    const confirmPasswordValue = this.newPasswordConfirm.value;
  
    if (passwordValue !== confirmPasswordValue) {
      this.passwords.setErrors({ 'notsame': true });
    } else {
      this.passwords.setErrors(null);
    }
  
    if (this.passwords.valid && !this.passwords.errors?.['notsame']) {
      console.log(passwordValue);
      this.newPasswordData = new NewPassword(userId, passwordValue);
      this.submitted = true;
      console.log(this.newPasswordData);
      this.accountService.updatePassword(this.newPasswordData).subscribe(() => {
        this.passwords.reset();
      });
    }
  }
  

  passwordCheck: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup; // Cast control to FormGroup
    
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('newPasswordConfirm')?.value;
  
    if (password !== confirmPassword) {
      return { 'notsame': true };
    }
    return null;
  }
  

  checkPasswordStrength(password: string) {
    console.log("zmrd")
    this.passwordStrength.uppercase = /[A-Z]/.test(password)
    this.passwordStrength.lowercase = /[a-z]/.test(password)
    this.passwordStrength.digit = /\d/.test(password)
    this.passwordStrength.specialCharacter = /[!@#$%^&*]/.test(password);
    this.passwordStrength.minLength = password.length >= 8;

    console.log("Password Strength:", this.passwordStrength);
  }
}
