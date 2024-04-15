import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthComponent } from './auth/auth.component';
import { WordSetListComponent } from './wordSets/word-set-list/word-set-list.component';
import { NewWordSetComponent } from './wordSets/new-word-set/new-word-set.component';
import { WordSetDetailComponent } from './wordSets/word-set-detail/word-set-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'profile', component: AccountComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'word-sets', component: WordSetListComponent},
  {path: 'word-sets/new', component: NewWordSetComponent},
  {path: 'word-sets/:setid', component: WordSetDetailComponent},
  {path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
