import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateUserComponent } from './dialog-create-user.component';

describe('DialogCreateUserComponent', () => {
  let component: DialogCreateUserComponent;
  let fixture: ComponentFixture<DialogCreateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
