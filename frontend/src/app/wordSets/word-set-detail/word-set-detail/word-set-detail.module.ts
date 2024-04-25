import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewWordComponent } from '../new-word/new-word.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateWordComponent } from '../update-word/update-word.component';



@NgModule({
  declarations: [
    NewWordComponent,
    UpdateWordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class WordSetDetailModule { }
