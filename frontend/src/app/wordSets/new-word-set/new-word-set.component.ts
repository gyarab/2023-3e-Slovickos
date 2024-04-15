import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WordSetData } from '../word-set.model';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { WordSetService } from '../word-set.service';
@Component({
  selector: 'app-new-word-set',
  templateUrl: './new-word-set.component.html',
  styleUrl: './new-word-set.component.css'
})
export class NewWordSetComponent implements OnInit{
 name!: FormControl;
 wordSet!: WordSetData;
 setId!: number;

  constructor(
    private dataService: DataService,
    private wordSetService: WordSetService,
    private router: Router) { }

  ngOnInit() {
    this.name = new FormControl<string>('', Validators.required);
  }

  handleCreateSet() {
   
    const userId = this.dataService.getCurrentUserId();
    this.wordSet = new WordSetData(this.name.value, userId)
    console.log(this.wordSet)
    this.name.reset()
    this.wordSetService.createWordSet(this.wordSet).subscribe(
      (data: number) => {
        this.setId = data
        this.router.navigate(['/word-sets/',this.setId])
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
