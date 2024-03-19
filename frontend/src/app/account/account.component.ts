import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../auth/auth.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit, OnDestroy{
  user!: User;
  userSub!: Subscription;
  constructor(private authService: AuthService) {  }
  
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      (data: User) => {
        this.user = data
      }
    )
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }
}
