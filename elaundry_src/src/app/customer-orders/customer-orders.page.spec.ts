import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerOrdersPage } from './customer-orders.page';

describe('CustomerOrdersPage', () => {
  let component: CustomerOrdersPage;
  let fixture: ComponentFixture<CustomerOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrdersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
