import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginThreejsComponent } from './login-threejs.component';

describe('LoginThreejsComponent', () => {
  let component: LoginThreejsComponent;
  let fixture: ComponentFixture<LoginThreejsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginThreejsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginThreejsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
