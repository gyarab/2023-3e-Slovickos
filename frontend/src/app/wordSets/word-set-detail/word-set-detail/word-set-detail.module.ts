import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewWordComponent } from '../new-word/new-word.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NewWordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class WordSetDetailModule { }
