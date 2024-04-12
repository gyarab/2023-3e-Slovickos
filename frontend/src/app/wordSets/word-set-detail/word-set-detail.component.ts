
import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { WordSetService } from '../word-set.service';
import {  Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Word } from '../word-set.model';
import { NewWordComponent } from './new-word/new-word.component';


@Component({
  selector: 'app-word-set-detail',
  templateUrl: './word-set-detail.component.html',
  styleUrl: './word-set-detail.component.css'
})
export class WordSetDetailComponent {
  setid!: any;
  words: Word[] = [];

  @ViewChild('wordContainer', { read: ViewContainerRef })
  wordContainer!: ViewContainerRef;


  constructor(private dataService: WordSetService, private route: ActivatedRoute, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }
  
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

  nvgNewWord(){
    this.router.navigate(['/word-sets/new-word'])
  }

  addWord() {
    const buttonElement = document.querySelector('button'); 
    if (buttonElement) {
      buttonElement.remove(); 
    }
    const wordComponentFactory = this.componentFactoryResolver.resolveComponentFactory(NewWordComponent);
    const componentRef = this.wordContainer.createComponent(wordComponentFactory);
  }

 
  
}