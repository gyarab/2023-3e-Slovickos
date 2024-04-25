import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  //authentication auto start
  title = 'authentication';
  constructor(private authService: AuthService){}
  ngOnInit(){
    this.authService.autoLogin()
  }
}
