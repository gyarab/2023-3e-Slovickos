import { Component } from '@angular/core';
import { DataService } from '../word-set.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WordSetData } from '../word-set.model';

@Component({
  selector: 'app-new-word-set',
  templateUrl: './new-word-set.component.html',
  styleUrl: './new-word-set.component.css'
})
export class NewWordSetComponent {
 name!: FormControl;
 wordSet!: WordSetData;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.name = new FormControl<string>('', Validators.required);
  }
  getSetName() {
    const userId = this.dataService.getCurrentUserId();
    this.wordSet = new WordSetData(this.name.get('name')?.value, userId)
    this.dataService.createWordSet(this.wordSet)
    console.log(this.wordSet)
  }
}
