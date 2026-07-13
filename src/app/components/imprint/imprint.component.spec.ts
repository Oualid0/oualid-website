import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprintComponent } from './imprint.component';

describe('ImprintComponent', () => {
  let component: ImprintComponent;
  let fixture: ComponentFixture<ImprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImprintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the imprint heading and address', () => {
    const text = fixture.nativeElement.textContent;
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Impressum');
    expect(text).toContain('Oualid O.');
    expect(text).toContain('Hamburg');
  });
});
