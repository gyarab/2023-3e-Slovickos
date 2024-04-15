import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
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
}