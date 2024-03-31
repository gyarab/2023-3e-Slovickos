import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSetListComponent } from './word-set-list.component';

describe('GetsetComponent', () => {
  let component: WordSetListComponent;
  let fixture: ComponentFixture<WordSetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordSetListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordSetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
