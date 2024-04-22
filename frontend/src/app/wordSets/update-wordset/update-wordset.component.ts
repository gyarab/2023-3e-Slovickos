import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DataService } from '../../data.service';
import { WordSetService } from '../word-set.service';
import { NameValid, WordSet, WordSetNameData } from '../word-set.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-wordset',
  templateUrl: './update-wordset.component.html',
  styleUrl: './update-wordset.component.css'
})
export class UpdateWordsetComponent implements OnInit {
  @Input() set: WordSet | undefined;
  newName!: FormControl;
  newNameData!: WordSetNameData;

  constructor(
    private router: Router,
    private dataService: DataService,
    private wordSetService: WordSetService,
    private route: ActivatedRoute,
  ){}

  ngOnInit() {
    console.log(this.set?.id)
    this.newName = new FormControl<string>('', [Validators.required, Validators.pattern(NameValid)]);
  }

  preventPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  updateWordSet() {
    this.newNameData = new WordSetNameData(this.set?.id, this.newName.value)
    this.wordSetService.updateWordSet(this.newNameData).subscribe();
    location.reload();
  }
}
