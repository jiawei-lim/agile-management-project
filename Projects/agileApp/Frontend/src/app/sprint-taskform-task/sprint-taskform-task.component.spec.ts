import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintTaskformTaskComponent } from './sprint-taskform-task.component';

describe('SprintTaskformTaskComponent', () => {
  let component: SprintTaskformTaskComponent;
  let fixture: ComponentFixture<SprintTaskformTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintTaskformTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintTaskformTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
