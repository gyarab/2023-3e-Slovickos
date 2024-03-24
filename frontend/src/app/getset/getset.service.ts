import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://127.0.0.1:7000/getSet/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}