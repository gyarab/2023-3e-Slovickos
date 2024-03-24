import { Component, OnInit } from '@angular/core';
import { DataService } from './getset.service'; 
import { Data } from '@angular/router';


@Component({
  selector: 'app-getset',
  templateUrl: './getset.component.html',
  styleUrl: './getset.component.css'
})
export class GetsetComponent implements OnInit {
  products: any = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getProducts().subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}