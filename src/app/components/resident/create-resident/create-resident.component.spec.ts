import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResidentComponent } from './create-resident.component';

describe('CreateResidentComponent', () => {
  let component: CreateResidentComponent;
  let fixture: ComponentFixture<CreateResidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateResidentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateResidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
