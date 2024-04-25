
import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { WordSetService } from '../word-set.service';
import { DataService } from '../../data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Word } from '../word-set.model';
import { NewWordComponent } from './new-word/new-word.component';
import { UpdateWordComponent } from './update-word/update-word.component';

@Component({
  selector: 'app-word-set-detail',
  templateUrl: './word-set-detail.component.html',
  styleUrl: './word-set-detail.component.css'
})
export class WordSetDetailComponent {
  setid!: any;
  words: Word[] = [];

  buttonVisible = true;
  updateButtonVisible = true;
  buttonVisibleMap: { [key: string]: boolean } = {};

  @ViewChild('wordContainer', { read: ViewContainerRef })
  wordContainer!: ViewContainerRef;
  @ViewChild('wordContainer', { read: ViewContainerRef })
  wordUpdateContainer!: ViewContainerRef;


  constructor(
    private dataService: DataService, 
    private wordSetService: WordSetService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }
  
  //getting setid from url and Words from backend
  ngOnInit() {
      this.route.paramMap.subscribe( (params: ParamMap) => {
      this.setid = params.get('setid')
      this.wordSetService.getWordSet(this.setid).subscribe(
        (data: Word[]) => {
          this.words = data;
          this.words.forEach(word => this.buttonVisibleMap[word.id] = true);
          console.table(this.words);
        },
        error => {
          console.error('Error:', error);
        }
      );
    });
  }



  //navigate to learing session (True/False)
  nvgLearning(){
    this.router.navigate(['/learning/',this.setid])
  }

  addWord() {
    this.buttonVisible = false;
    const wordComponentFactory = this.componentFactoryResolver.resolveComponentFactory(NewWordComponent);
    const componentRef = this.wordContainer.createComponent(wordComponentFactory);
  }

  updateWord() {
    this.buttonVisible = false;
    const wordComponentFactory = this.componentFactoryResolver.resolveComponentFactory(UpdateWordComponent);
    const componentRef = this.wordUpdateContainer.createComponent(wordComponentFactory);
  }
 
  deleteWord(id: any): void {
    this.wordSetService.deleteWord(id)
      .subscribe();
      location.reload()
  }

}