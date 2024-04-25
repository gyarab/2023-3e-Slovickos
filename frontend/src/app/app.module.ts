import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { WordSetModule } from './wordSets/word-set.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LearningModule } from './learning/learning.module';
import { HomeModule } from './home/home.module';
import { NormalLearnComponent } from './normal-learn/normal-learn.component';
import { AccountModule } from './account/account.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NormalLearnComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    CommonModule,
    WordSetModule,
    LearningModule,
    HomeModule,
    AccountModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync()
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
