import { Component, OnInit, model } from '@angular/core';
import { DataService } from '../../../data.service'; 
import { WordSetService } from '../../word-set.service';
import {  ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Word } from '../../word-set.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrl: './new-word.component.css'
})
export class NewWordComponent implements OnInit {

  newWordVariable!: Word;
  base!: FormControl;
  translation!: FormControl;
  setid!: any;
  myForm: FormGroup = new FormGroup({})
  constructor( private dataService: DataService,
     private  wordSetService: WordSetService,
     private route: ActivatedRoute,
      private router: Router) {}
  
  
  ngOnInit() {
    // získání idsetu z URL
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.setid = params.get('setid')
    });

    // formGroup - vytvářím políčka pro input usera
    this.myForm = new FormGroup({
      base: new FormControl ('',Validators.required),
      translation: new FormControl ('',Validators.required),
    });
  }
  
  handleCreateWord() {
    if (this.myForm.valid) {
      // hodnoty z formGroup na POST request Djanga 
      const baseValue = this.myForm.get('base')?.value;
      const translationValue = this.myForm.get('translation')?.value;
      this.newWordVariable = new Word (this.setid, baseValue, translationValue)
    }
      
    this.wordSetService.createWord(this.newWordVariable).subscribe();
    
    //reload page
    location.reload()
    
  }
}