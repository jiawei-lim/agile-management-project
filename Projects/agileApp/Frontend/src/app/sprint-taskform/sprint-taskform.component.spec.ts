import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintTaskformComponent } from './sprint-taskform.component';

describe('SprintTaskformComponent', () => {
  let component: SprintTaskformComponent;
  let fixture: ComponentFixture<SprintTaskformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintTaskformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintTaskformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
