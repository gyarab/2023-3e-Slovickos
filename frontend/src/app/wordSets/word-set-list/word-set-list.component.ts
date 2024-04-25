import { Component, ComponentFactoryResolver, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core'; 
import { Subscription } from 'rxjs';
import { WordSet } from '../word-set.model';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { WordSetService } from '../word-set.service';
import { UpdateWordsetComponent } from '../update-wordset/update-wordset.component';

@Component({
  selector: 'app-getset',
  templateUrl: './word-set-list.component.html',
  styleUrl: './word-set-list.component.css'
})
export class WordSetListComponent implements OnInit {
  sets: WordSet[] = [];
  username: string = '';
  userSub!: Subscription;
  buttonVisibleMap: { [key: string]: boolean } = {};
  updateComponents: UpdateWordsetComponent[] = [];
  @ViewChildren('wordSetUpdateContainer', { read: ViewContainerRef }) wordSetUpdateContainers!: QueryList<ViewContainerRef>;
  
  constructor(
    private dataService: DataService, 
    private wordSetService: WordSetService, 
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    const userId = this.dataService.getCurrentUserId();
    if (userId !== null) {
      this.wordSetService.getUserSets(userId).subscribe(
        (data) => {
          this.username = data.username[0].name;
          this.sets = data.word_sets;
          console.log(this.username);
          console.log(this.sets);
          this.sets.forEach(set => this.buttonVisibleMap[set.id] = true);
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }

  newSet(){
    this.router.navigate(['/word-sets/new'])
  }

  deleteWordSet(id: any): void {
    this.wordSetService.deleteWordSet(id)
      .subscribe(
        response => {
          console.table('Word Set deleted successfully');
        },
        error => {
          console.error('Error deleting Word Set:', error);
        }
      );
      location.reload()
  }

  deleteWord(id: any): void {
    this.wordSetService.deleteWord(id)
      .subscribe(
        response => {
          console.table('Word Set deleted successfully');
        },
        error => {
          console.error('Error deleting Word Set:', error);
        }
      );
      location.reload()
  }

  nvgWordSetDetail(setId: any){
    console.log(setId)
    this.router.navigate(['/word-sets/',setId])
  }

  displayWordSetUpdateComponent(event: MouseEvent, setId: string, index: number): void {
    event.stopPropagation(); // Stop event propagation to prevent li click event
    this.buttonVisibleMap[setId] = !this.buttonVisibleMap[setId];

    // Check if component is already created for this index
    if (!this.updateComponents[index]) {
      // Resolve component factory for UpdateWordsetComponent
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UpdateWordsetComponent);
      
      // Dynamically create the component
      const componentRef = this.wordSetUpdateContainers.toArray()[index].createComponent(componentFactory);
      
      // Pass any necessary data to the component
      const set = this.sets.find(set => set.id === setId);
      componentRef.instance.set = set;

      // Store the reference of the created component
      this.updateComponents[index] = componentRef.instance;
    }
  }
}