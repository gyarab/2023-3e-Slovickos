import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordSetListComponent } from './word-set-list/word-set-list.component';
import { NewWordSetComponent } from './new-word-set/new-word-set.component';



@NgModule({
  declarations: [
    WordSetListComponent,
    NewWordSetComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class WordSetModule { }
