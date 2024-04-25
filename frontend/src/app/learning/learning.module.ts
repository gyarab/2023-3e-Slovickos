import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningComponent } from './learning.component';
import { MatButton, MatButtonModule, MatFabButton } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    LearningComponent
  ],
  imports: [
    CommonModule,
    MatButton,
    MatButtonModule,
    MatFabButton,
    MatIconModule,
    MatIcon,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule

  ]
})
export class LearningModule { }
