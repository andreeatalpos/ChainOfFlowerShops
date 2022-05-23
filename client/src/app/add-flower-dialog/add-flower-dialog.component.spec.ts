import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlowerDialogComponent } from './add-flower-dialog.component';

describe('AddFlowerDialogComponent', () => {
  let component: AddFlowerDialogComponent;
  let fixture: ComponentFixture<AddFlowerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFlowerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFlowerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
