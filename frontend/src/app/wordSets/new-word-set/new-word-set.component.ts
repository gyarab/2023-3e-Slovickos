import { Component, OnInit } from '@angular/core';
import { DataService } from '../word-set.service';
import { FormControl, Validators } from '@angular/forms';
import { WordSetData } from '../word-set.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-word-set',
  templateUrl: './new-word-set.component.html',
  styleUrl: './new-word-set.component.css'
})
export class NewWordSetComponent implements OnInit{
 name!: FormControl;
 wordSet!: WordSetData;
 setId!: number;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.name = new FormControl<string>('', Validators.required);
  }

  handleCreateSet() {
   
    const userId = this.dataService.getCurrentUserId();
    this.wordSet = new WordSetData(this.name.value, userId)
    console.log(this.wordSet)
    this.name.reset()
    this.dataService.createWordSet(this.wordSet).subscribe(
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
