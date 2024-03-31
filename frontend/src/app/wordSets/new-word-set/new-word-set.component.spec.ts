import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWordSetComponent } from './new-word-set.component';

describe('NewWordSetComponent', () => {
  let component: NewWordSetComponent;
  let fixture: ComponentFixture<NewWordSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewWordSetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewWordSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
