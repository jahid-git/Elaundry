import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectAddressOnMapComponent } from './select-address-on-map.component';

describe('SelectAddressOnMapComponent', () => {
  let component: SelectAddressOnMapComponent;
  let fixture: ComponentFixture<SelectAddressOnMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAddressOnMapComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectAddressOnMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
