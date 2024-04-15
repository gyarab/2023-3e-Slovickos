import { Component, OnInit } from '@angular/core';
import { WordSetService } from '../wordSets/word-set.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { WordData } from '../wordSets/word-set.model';

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
  imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtkL8GlKZ775j3f0VVgS1rU8L2LoX5UEM6fKv_eGLzeza27WYH";
  randomItem: any;

  constructor(private wordSetService: WordSetService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.setid = params.get('setid');
      this.wordSetService.getWordSet(this.setid).subscribe(
        (data: WordData[]) => {
          this.words = data;
          console.table(this.words);
          this.resetToBeginning();
        },
        error => {
          console.error('Error:', error);
        }
      );
    });
  }

  //POLE PRIDAT SLOVICKA IF JE V POLI TAK DALSI MATH RANDOM A JESTLI NE TAK PRIDAT TO POLE. JESTLI JE TO POLE VETSI JAK LENGTH SLOVICEK TAK CELEBRATION A REROUTE DO PICE
  getRandomItem(): void {
    this.currentIndex = Math.floor(Math.random() * this.words.length);
    this.randomItem = this.words[this.currentIndex];
    this.flipped = false;
  }

  toggle(): void {
    this.flipped = !this.flipped;
  }

  //action button Next
  showNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.words.length;
    this.randomItem = this.words[this.currentIndex];
    this.flipped = false;
    
  }

  //action button Previous
  showPrevious(): void {
    this.currentIndex = (this.currentIndex - 1 + this.words.length) % this.words.length;
    this.randomItem = this.words[this.currentIndex];
    this.flipped = false;
    
  }

  //action button Restart
  resetToBeginning(): void {
    this.currentIndex = 0;
    this.randomItem = this.words[this.currentIndex];
    this.flipped = false;
  }

}
