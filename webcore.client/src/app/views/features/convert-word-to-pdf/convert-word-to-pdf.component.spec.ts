import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertWordToPdfComponent } from './convert-word-to-pdf.component';

describe('ConvertWordToPdfComponent', () => {
  let component: ConvertWordToPdfComponent;
  let fixture: ComponentFixture<ConvertWordToPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertWordToPdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertWordToPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
