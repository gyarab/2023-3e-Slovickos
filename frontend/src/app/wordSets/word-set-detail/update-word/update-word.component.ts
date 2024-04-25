import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../data.service';
import { WordSetService } from '../../word-set.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NameValid, WordData } from '../../word-set.model';

@Component({
  selector: 'app-update-word',
  templateUrl: './update-word.component.html',
  styleUrl: './update-word.component.css'
})
export class UpdateWordComponent implements OnInit {
  newWord: FormGroup = new FormGroup ({});
  base!: FormControl;
  translation!: FormControl;
  newWordData!: WordData;
  setid!: any;
  
  constructor(
    private dataService: DataService,
    private  wordSetService: WordSetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.setid = params.get('setid')
    });


    this.newWord = new FormGroup ({
      base: new FormControl ('', [Validators.required, Validators.pattern(NameValid)]),
      translation: new FormControl ('', [Validators.required, Validators.pattern(NameValid)]),
    })
  }

  handleUpdateWord() {
    if (this.newWord.valid) {
      // hodnoty z formGroup na POST request Djanga 
      const baseValue = this.newWord.get('base')?.value;
      const translationValue = this.newWord.get('translation')?.value;
      this.newWordData = new WordData (this.setid, baseValue, translationValue)
    }
  }


  preventPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}
