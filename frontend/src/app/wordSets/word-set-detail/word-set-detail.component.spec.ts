import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSetDetailComponent } from './word-set-detail.component';

describe('WordSetDetailComponent', () => {
  let component: WordSetDetailComponent;
  let fixture: ComponentFixture<WordSetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordSetDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordSetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});