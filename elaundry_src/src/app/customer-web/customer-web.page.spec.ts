import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerWebPage } from './customer-web.page';

describe('CustomerWebPage', () => {
  let component: CustomerWebPage;
  let fixture: ComponentFixture<CustomerWebPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerWebPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerWebPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
