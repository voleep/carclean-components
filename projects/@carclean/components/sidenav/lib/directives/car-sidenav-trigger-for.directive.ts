import { Directive, input } from '@angular/core';
import { CarSidenav } from '../car-sidenav.component';

@Directive({
  standalone: true,
  selector: 'button[carSidenavTriggerFor]',
  host: {
    '[class.car-sidenav-trigger]': 'true',
    '(click)': 'onClick()',
  },
})
export class CarSidenavTriggerFor {
  sidenav = input.required<CarSidenav>({
    alias: 'carSidenavTriggerFor',
  });

  onClick(): void {
    this.sidenav().toggle();
  }
}
