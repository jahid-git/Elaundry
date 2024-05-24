import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhoneAuthenticationPage } from './phone-authentication.page';

describe('PhoneAuthenticationPage', () => {
  let component: PhoneAuthenticationPage;
  let fixture: ComponentFixture<PhoneAuthenticationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneAuthenticationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhoneAuthenticationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
