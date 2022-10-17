import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBarchartComponent } from './member-barchart.component';

describe('MemberBarchartComponent', () => {
  let component: MemberBarchartComponent;
  let fixture: ComponentFixture<MemberBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberBarchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
