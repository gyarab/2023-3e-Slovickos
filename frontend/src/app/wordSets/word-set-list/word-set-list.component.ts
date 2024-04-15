import { Component, OnInit } from '@angular/core'; 
import { Subscription } from 'rxjs';
import { WordSet } from '../word-set.model';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { WordSetService } from '../word-set.service';

@Component({
  selector: 'app-getset',
  templateUrl: './word-set-list.component.html',
  styleUrl: './word-set-list.component.css'
})
export class WordSetListComponent implements OnInit {
  sets: WordSet[] = [];
  username: string = '';
  userSub!: Subscription;
  
  constructor(
    private dataService: DataService, 
    private wordSetService: WordSetService, 
    private router: Router
  ) { }

  ngOnInit() {
    const userId = this.dataService.getCurrentUserId();
    if (userId !== null) {
      this.wordSetService.getUserSets(userId).subscribe(
        (data) => {
          this.username = data.username[0].name;
          this.sets = data.word_sets;
          console.log(this.username);
          console.log(this.sets);
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }
  newSet(){
    this.router.navigate(['/word-sets/new'])
  }
  nvgWordSetDetail(setId: any){
    
    console.log(setId)
    
    this.router.navigate(['/word-sets/',setId])

  }
}