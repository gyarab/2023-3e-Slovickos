import { Component, OnInit } from '@angular/core';
import { DataService } from './getset.service'; 
import { Data } from '@angular/router';
import { User } from '../auth/auth.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserSet, setModel } from './getset.model';


@Component({
  selector: 'app-getset',
  templateUrl: './getset.component.html',
  styleUrl: './getset.component.css'
})
export class GetsetComponent implements OnInit {
  sets: UserSet[] = [];
  userSub!: Subscription;


  constructor(private dataService: DataService, private authService: AuthService) { }

  ngOnInit() {
    this.dataService.sendUserId()
    this.dataService.getUserSets().subscribe(
      (data: UserSet[]) => {
        this.sets = data;
        console.log(this.sets)
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}