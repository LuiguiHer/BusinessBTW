import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadBusinessComponent } from './read-business.component';

describe('ReadBusinessComponent', () => {
  let component: ReadBusinessComponent;
  let fixture: ComponentFixture<ReadBusinessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadBusinessComponent]
    });
    fixture = TestBed.createComponent(ReadBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
