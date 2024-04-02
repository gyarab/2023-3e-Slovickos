import { Component } from '@angular/core';
import { DataService } from '../word-set.service';
import { Router } from '@angular/router';
import { Word } from '../word-set.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-word-set-detail',
  templateUrl: './word-set-detail.component.html',
  styleUrl: './word-set-detail.component.css'
})
export class WordSetDetailComponent {
  words: Word[] = [];
  userSub!: Subscription;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    const userId = this.dataService.getCurrentUserId();
    if (userId !== null) {
      this.dataService.getWordSet(userId).subscribe(
        (data: Word[]) => {
          this.words = data;
          console.log(this.words);
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }
}
