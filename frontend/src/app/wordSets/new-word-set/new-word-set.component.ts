import { Component } from '@angular/core';
import { DataService } from '../word-set.service';

@Component({
  selector: 'app-new-word-set',
  templateUrl: './new-word-set.component.html',
  styleUrl: './new-word-set.component.css'
})
export class NewWordSetComponent {


  constructor(private dataService: DataService) { }

  ngOnInit() {
    const userId = this.dataService.getCurrentUserId();
  }
}
