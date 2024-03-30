import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { setModel } from './getset.model';
import { AuthResData, loginModel } from '../auth/auth.model';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://127.0.0.1:7000/getSet/';

  constructor(private http: HttpClient) { }

  sendUserId(){
    const userDataString = localStorage.getItem('user');
    // Retrieve user data from localStorage
    if (userDataString) {
      // Parse user data string to an object
      const userData = JSON.parse(userDataString);
      
      // Access the id property
      const userId = userData.id;
  
      // Now, you can send the userId to your Django server
      // For example:
      this.http.post<string>(this.baseUrl, { userId })
        .subscribe(
          response => {
            // Update UI, e.g., display success message
            console.log('Operation successful:', response);
          },
          error => {
            // Handle error response from server
            console.error('Error:', error);
          }
        );
    } 
    else {
      console.error('User data not found in local storage');
    }
  }

  getUserSets(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}