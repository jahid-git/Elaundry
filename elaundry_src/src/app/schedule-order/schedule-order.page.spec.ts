import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScheduleOrderPage } from './schedule-order.page';

describe('ScheduleOrderPage', () => {
  let component: ScheduleOrderPage;
  let fixture: ComponentFixture<ScheduleOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
