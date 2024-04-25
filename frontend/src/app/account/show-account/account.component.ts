import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../auth/auth.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit, OnDestroy{
  user!: User;
  userSub!: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {  }
  
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

  nvgProfileUpdate() {
    this.router.navigate(['profile/update'])
  }
}
