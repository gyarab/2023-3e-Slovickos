import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { WordSetData } from './word-set.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://127.0.0.1:7000/word-sets/';
  errorMessage: any;

  constructor(private http: HttpClient) { }

  getCurrentUserId(): number | null {
    const userDataString = localStorage.getItem('user');
    // Retrieve user data from localStorage
    if (userDataString) {
      // Parse user data string to an object
      const userData = JSON.parse(userDataString);
      
      // Access the id property
      return userData.id;
    } 
    else {
      console.error('No user is logged in.');
      return null;
    }
  }

  getUserSets(userId: number): Observable<any> {
    return this.http.post(this.baseUrl, { userId });
  }

  createWordSet(set: WordSetData): Observable<any> {
    console.log(this.baseUrl + 'create-word-set')
    return this.http.post<WordSetData>(this.baseUrl + 'create-word-set', set);
  }

  getWordSet(setId: number): Observable<any> {
    return this.http.get(this.baseUrl + setId);
  }
  
}