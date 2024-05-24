import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateCommOrderPage } from './create-comm-order.page';

describe('CreateCommOrderPage', () => {
  let component: CreateCommOrderPage;
  let fixture: ComponentFixture<CreateCommOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCommOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCommOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
