import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordSetListComponent } from './word-set-list/word-set-list.component';
import { NewWordSetComponent } from './new-word-set/new-word-set.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { WordSetDetailComponent } from './word-set-detail/word-set-detail.component';
import { NewWordComponent } from './word-set-detail/new-word/new-word.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WordSetListComponent,
    NewWordSetComponent,
    WordSetDetailComponent,
    NewWordComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class WordSetModule { }
