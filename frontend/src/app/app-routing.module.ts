import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthComponent } from './auth/auth.component';
import { GetsetComponent } from './getset/getset.component';

const routes: Routes = [
  {path: 'profile', component: AccountComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'getSet', component: GetsetComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
