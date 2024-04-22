import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/show-account/account.component';
import { AuthComponent } from './auth/auth.component';
import { WordSetListComponent } from './wordSets/word-set-list/word-set-list.component';
import { NewWordSetComponent } from './wordSets/new-word-set/new-word-set.component';
import { WordSetDetailComponent } from './wordSets/word-set-detail/word-set-detail.component';
import { NewWordComponent } from './wordSets/word-set-detail/new-word/new-word.component';
import { LearningComponent } from './learning/learning.component';
import { HomeComponent } from './home/home.component';
import { UpdateAccountComponent } from './account/update-account/update-account.component';

const routes: Routes = [
  {path: 'profile', component: AccountComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'word-sets', component: WordSetListComponent},
  {path: 'word-sets/new', component: NewWordSetComponent},
  {path: 'word-sets/:setid', component: WordSetDetailComponent},
  {path: '', component: HomeComponent},
  {path: 'new-word', component: NewWordComponent},
  {path: 'learning/:setid', component: LearningComponent},
  {path: 'profile/update', component: UpdateAccountComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
