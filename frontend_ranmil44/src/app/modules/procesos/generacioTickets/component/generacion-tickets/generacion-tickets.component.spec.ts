import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneracionTicketsComponent } from './generacion-tickets.component';

describe('GeneracionTicketsComponent', () => {
  let component: GeneracionTicketsComponent;
  let fixture: ComponentFixture<GeneracionTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneracionTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneracionTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
