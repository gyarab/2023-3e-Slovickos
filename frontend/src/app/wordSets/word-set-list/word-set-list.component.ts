import { Component, OnInit } from '@angular/core';
import { DataService } from '../word-set.service'; 
import { Subscription } from 'rxjs';
import { WordSet } from '../word-set.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getset',
  templateUrl: './word-set-list.component.html',
  styleUrl: './word-set-list.component.css'
})
export class WordSetListComponent implements OnInit {
  sets: WordSet[] = [];
  userSub!: Subscription;


  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    const userId = this.dataService.getCurrentUserId();
    if (userId !== null) {
      this.dataService.getUserSets(userId).subscribe(
        (data: WordSet[]) => {
          this.sets = data;
          console.log(this.sets);
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }
  newSet(){
    this.router.navigate(['/new'])
  }
  nvgWordSetDetail(setId: any){
    
    console.log(setId)
    
    this.router.navigate(['/word-sets/',setId])

  }
}