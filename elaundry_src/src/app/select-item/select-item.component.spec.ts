import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectItemComponent } from './select-item.component';

describe('SelectItemComponent', () => {
  let component: SelectItemComponent;
  let fixture: ComponentFixture<SelectItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
