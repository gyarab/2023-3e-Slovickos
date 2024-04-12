import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WordSetData, Word } from './word-set.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordSetService {
  private baseUrl = 'http://127.0.0.1:7000/word-sets/';
  errorMessage: any;

  constructor(private http: HttpClient) { }

  getUserSets(userId: number): Observable<any> {
    return this.http.post(this.baseUrl, { userId });
  }

  createWordSet(set: WordSetData): Observable<any> {
    return this.http.post<WordSetData>(this.baseUrl + 'new', set);
  }

  createWord(wordData: Word): Observable<any> {
    
    return this.http.post<Word>(this.baseUrl + 'new-word', wordData)
      .pipe(
        catchError(error => {
          throw 'Error creating new word: ' + error;
        })
      );
  }

  getWordSet(setId: number): Observable<any> {
    return this.http.get(this.baseUrl + setId);
  }
  
}