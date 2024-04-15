import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HomeService } from './home.service';
import { WordSet } from '../wordSets/word-set.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  oldSets: WordSet[] = [];
  youngSets: WordSet[] = [];
  username: string = '';
  isAuthenticated: boolean = false;
  
  constructor(
    private dataService: DataService,
    private homeService: HomeService,
    private router: Router,
  ){}

  ngOnInit() {
    const userId = this.dataService.getCurrentUserId()
    if(userId !== null) {
    this.isAuthenticated = true;
    this.homeService.getUserSuggestedSets(userId).subscribe(
      (data) => {
        this.username = data.username[0].name;
        this.oldSets = data.oldest_word_sets;
        this.youngSets = data.youngest_word_sets;
        console.log(this.username);
        console.log(this.oldSets);
        console.log(this.youngSets);
      },
      error => {
        console.error('Error:', error);
      }
    )
    }
  }
  nvgWordSetDetail(setId: any){
    this.router.navigate(['/word-sets/',setId])
  }
  nvgAuth(){
    this.router.navigate(['/auth'])
  }
}
