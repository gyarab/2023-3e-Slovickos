import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalLearnComponent } from './normal-learn.component';

describe('NormalLearnComponent', () => {
  let component: NormalLearnComponent;
  let fixture: ComponentFixture<NormalLearnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NormalLearnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NormalLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
