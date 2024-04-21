import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewEmail, NewName, NewPassword, NewUserName } from './account.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = 'http://127.0.0.1:7000/api/accounts/'
  

  constructor(private http: HttpClient) { }

  updateName(newName: NewName): Observable<any> {
    return this.http.post(this.baseUrl + 'update-name', newName)
  }

  updateUserName(newUserName: NewUserName): Observable<any> {
    return this.http.post(this.baseUrl + 'update-username', newUserName)
  }

  updateEmail(newEmail: NewEmail): Observable<any> {
    return this.http.post(this.baseUrl + 'update-email', newEmail)
  }

  updatePassword(newPassword: NewPassword): Observable<any> {
    return this.http.post(this.baseUrl + 'update-password', newPassword)
  }
}
