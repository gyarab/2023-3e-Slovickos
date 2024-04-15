import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LearningService {

  private baseUrl = 'http://127.0.0.1:7000/word-sets/';
  errorMessage: any;

  constructor(private http: HttpClient) { }
}
