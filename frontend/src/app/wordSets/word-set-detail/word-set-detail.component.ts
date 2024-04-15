import { Component } from '@angular/core';
import { WordSetService } from '../word-set.service';
import {  ActivatedRoute, ParamMap } from '@angular/router';
import { Word } from '../word-set.model';


@Component({
  selector: 'app-word-set-detail',
  templateUrl: './word-set-detail.component.html',
  styleUrl: './word-set-detail.component.css'
})
export class WordSetDetailComponent {
  setid!: any;
  words: Word[] = [];

  constructor(private dataService: WordSetService, private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.setid = params.get('setid')
      this.dataService.getWordSet(this.setid).subscribe(
        (data: Word[]) => {
          this.words = data;
          console.log(this.words);
        },
        error => {
          console.error('Error:', error);
        }
      );
    });
  }
}