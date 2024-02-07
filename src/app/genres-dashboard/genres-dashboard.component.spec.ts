import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresDashboardComponent } from './genres-dashboard.component';
import { CommonModule } from '@angular/common';

describe('GenresDashboardComponent', () => {
  let component: GenresDashboardComponent;
  let fixture: ComponentFixture<GenresDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenresDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenresDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
