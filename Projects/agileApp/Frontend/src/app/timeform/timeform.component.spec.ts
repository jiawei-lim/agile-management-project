import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeformComponent } from './timeform.component';

describe('TimeformComponent', () => {
  let component: TimeformComponent;
  let fixture: ComponentFixture<TimeformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
