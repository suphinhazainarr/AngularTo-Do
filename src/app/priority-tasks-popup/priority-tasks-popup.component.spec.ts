import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityTasksPopupComponent } from './priority-tasks-popup.component';

describe('PriorityTasksPopupComponent', () => {
  let component: PriorityTasksPopupComponent;
  let fixture: ComponentFixture<PriorityTasksPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorityTasksPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriorityTasksPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
