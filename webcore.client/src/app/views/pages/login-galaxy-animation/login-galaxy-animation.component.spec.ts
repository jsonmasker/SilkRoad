import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginGalaxyAnimationComponent } from './login-galaxy-animation.component';

describe('LoginGalaxyAnimationComponent', () => {
  let component: LoginGalaxyAnimationComponent;
  let fixture: ComponentFixture<LoginGalaxyAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginGalaxyAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginGalaxyAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
