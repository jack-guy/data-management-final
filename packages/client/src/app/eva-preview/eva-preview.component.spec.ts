import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaPreviewComponent } from './eva-preview.component';

describe('EvaPreviewComponent', () => {
  let component: EvaPreviewComponent;
  let fixture: ComponentFixture<EvaPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
