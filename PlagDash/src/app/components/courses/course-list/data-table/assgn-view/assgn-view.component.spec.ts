import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssgnViewComponent } from './assgn-view.component';

describe('AssgnViewComponent', () => {
  let component: AssgnViewComponent;
  let fixture: ComponentFixture<AssgnViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssgnViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssgnViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
