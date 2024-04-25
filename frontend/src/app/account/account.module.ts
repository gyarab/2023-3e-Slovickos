import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './show-account/account.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { MatButton, MatButtonModule, MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AccountComponent,
    UpdateAccountComponent
  ],
  imports: [
    CommonModule,
    MatButton,
    MatButtonModule,
    MatFabButton,
    MatIcon,
    ReactiveFormsModule,
  ]
})
export class AccountModule { }
