import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintlistComponent } from './sprintlist.component';

describe('SprintlistComponent', () => {
  let component: SprintlistComponent;
  let fixture: ComponentFixture<SprintlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
