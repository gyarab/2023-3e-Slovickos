import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWordsetComponent } from './update-wordset.component';

describe('UpdateWordsetComponent', () => {
  let component: UpdateWordsetComponent;
  let fixture: ComponentFixture<UpdateWordsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateWordsetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateWordsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
