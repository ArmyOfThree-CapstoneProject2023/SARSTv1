import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResidentComponent } from './list-resident.component';

describe('ListResidentComponent', () => {
  let component: ListResidentComponent;
  let fixture: ComponentFixture<ListResidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListResidentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListResidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
