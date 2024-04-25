import { Component, OnInit } from '@angular/core';
import { WordSetService } from '../wordSets/word-set.service';
import { LearningService } from './learning.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { WordData } from '../wordSets/word-set.model';
import { DataService } from '../data.service';


@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})
export class LearningComponent implements OnInit {
  setid!: any;
  words: WordData[] = [];
  currentIndex = 0;
  flipped = false;
  randomItem: any;
  showRestartButton = false;

  count!: number;
  isButtonDisabled = false;

  constructor(
    private wordSetService: WordSetService, 
    private route: ActivatedRoute, 
    private learningService: LearningService,
    private dataService: DataService,
    private router: Router
  ) {}

  //recieving Words with false value + setid from url to send request
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.setid = params.get('setid');
      this.wordSetService.getFalseWordSet(this.setid).subscribe(
        (data: WordData[]) => {
          this.words = data;
          this.shuffleWords();
          this.resetToBeginning();
          this.count = this.words.length - 1
          console.table(this.count)
          this.isButtonDisabled = false
        },
        error => {
          console.error('Error:', error);
        }
      );
    });
  }

  getRandomItem(): void {
    this.currentIndex = Math.floor(Math.random() * this.words.length);
    this.randomItem = this.words[this.currentIndex];
    this.flipped = false;
    this.updateRestartButtonVisibility();
  }

  toggle(): void {
    this.flipped = !this.flipped;
  }

  showNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.words.length;
    this.randomItem = this.words[this.currentIndex];
    this.flipped = false;
    this.updateRestartButtonVisibility();
    this.count = this.count - 1
    console.log(this.count)
  }

  showPrevious(): void {
    this.currentIndex = (this.currentIndex - 1 + this.words.length) % this.words.length;
    this.randomItem = this.words[this.currentIndex];
    this.flipped = false;
    this.updateRestartButtonVisibility();
  }

  resetToBeginning(): void {
    this.currentIndex = 0;
    this.randomItem = this.words[this.currentIndex];
    this.flipped = false;
    this.updateRestartButtonVisibility();
  }

  shuffleWords(): void {
    // Fisher-Yates (Knuth) shuffle algorithm
    for (let i = this.words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.words[i], this.words[j]] = [this.words[j], this.words[i]];
    }
    this.resetToBeginning(); // Reset to the first word after shuffling
  }

  evaluateWord(correct: boolean, wordid: any): void {
    const userId = this.dataService.getCurrentUserId();
    this.learningService.sendSuccesfulRate(correct, wordid, userId).subscribe();

    console.log(`User selected: ${correct ? 'Correct' : 'Incorrect'}`);
    // Move to the next word
    this.showNext();
  }

  updateRestartButtonVisibility(): void {
    // Check if currentIndex is at the end of the words array
    if (this.count == 0) {
      this.showRestartButton = true
      this.isButtonDisabled = true;
      
    }
  }

  continue(): void {
    this.isButtonDisabled = false;
    location.reload()
  }

  restart(): void {
    this.learningService.restartAllWords(this.setid).subscribe();
    console.log(this.setid)
    this.count = this.words.length
    this.isButtonDisabled = false;
    location.reload()
  }

  disableButton(): void {
    this.isButtonDisabled = true;
  }

  enableButton(): void {
    this.isButtonDisabled = false;
  }

  navigateToFlashcardNormal(): void {
    this.router.navigate(['/normallearning/', this.setid]);
  }
}
