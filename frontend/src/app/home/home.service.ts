import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = 'http://127.0.0.1:7000/';

  constructor(private http: HttpClient) { }

  getUserSuggestedSets(userId: number): Observable<any> {
    return this.http.post(this.baseUrl, { userId });
  }
}
