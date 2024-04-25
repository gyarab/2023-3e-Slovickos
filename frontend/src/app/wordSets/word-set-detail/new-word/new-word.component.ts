import { Component, OnInit, model } from '@angular/core';
import { DataService } from '../../../data.service'; 
import { WordSetService } from '../../word-set.service';
import {  ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NameValid, WordData } from '../../word-set.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrl: './new-word.component.css'
})
export class NewWordComponent implements OnInit {

  newWordVariable!: WordData;
  base!: FormControl;
  translation!: FormControl;
  setid!: any;
  myForm: FormGroup = new FormGroup({});
  constructor(
    private dataService: DataService,
    private  wordSetService: WordSetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  
  ngOnInit() {
    // recieving setid from URL
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.setid = params.get('setid')
    });

    // formGroup - makes poles for input user
    this.myForm = new FormGroup({
      base: new FormControl ('', [Validators.required, Validators.pattern(NameValid)]),
      translation: new FormControl ('', [Validators.required, Validators.pattern(NameValid)]),
    });
  }
  
  handleCreateWord() {
    if (this.myForm.valid) {
      // values from formGroup to POST request Django 
      const baseValue = this.myForm.get('base')?.value;
      const translationValue = this.myForm.get('translation')?.value;
      this.newWordVariable = new WordData (this.setid, baseValue, translationValue)
    }
      
    this.wordSetService.createWord(this.newWordVariable).subscribe();
    
    //reload page
    location.reload()
    
  }
}