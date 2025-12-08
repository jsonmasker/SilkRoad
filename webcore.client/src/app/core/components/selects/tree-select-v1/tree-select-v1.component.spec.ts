import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeSelectV1Component } from './tree-select-v1.component';

describe('TreeSelectV1Component', () => {
  let component: TreeSelectV1Component;
  let fixture: ComponentFixture<TreeSelectV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeSelectV1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeSelectV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
