
import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { WordSetService } from '../word-set.service';
import { DataService } from '../../data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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

  buttonVisible = true;

  @ViewChild('wordContainer', { read: ViewContainerRef })
  wordContainer!: ViewContainerRef;


  constructor(private dataService: DataService, private wordSetService: WordSetService, private route: ActivatedRoute, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }
  
  ngOnInit() {
      this.route.paramMap.subscribe( (params: ParamMap) => {
      this.setid = params.get('setid')
      this.wordSetService.getWordSet(this.setid).subscribe(
        (data: Word[]) => {
          this.words = data;
          console.table(this.words);
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

  nvgLearning(){
    this.router.navigate(['/learning/',this.setid])
  }

  addWord() {
    this.buttonVisible = false;
    const wordComponentFactory = this.componentFactoryResolver.resolveComponentFactory(NewWordComponent);
    const componentRef = this.wordContainer.createComponent(wordComponentFactory);
  }


  //POUIT Z NGOONINIT PARAM A ZISKAT SETID NO A PAK NEJAK PREDAT Z HTML ID SLOVICKA TO POSLAT ZE VYMAZAT
  deleteWord(id: any): void {
    this.wordSetService.deleteWord(id)
      .subscribe(
        response => {
          console.table('Word Set deleted successfully');
        },
        error => {
          console.error('Error deleting Word Set:', error);
        }
      );
      location.reload()
  }

}