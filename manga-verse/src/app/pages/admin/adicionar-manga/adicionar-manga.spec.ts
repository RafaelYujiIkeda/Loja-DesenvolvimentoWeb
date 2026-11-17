import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarManga } from './adicionar-manga';

describe('AdicionarManga', () => {
  let component: AdicionarManga;
  let fixture: ComponentFixture<AdicionarManga>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarManga],
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionarManga);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
