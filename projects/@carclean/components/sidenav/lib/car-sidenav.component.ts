import { NgFor } from '@angular/common';
import { Component, input, signal, viewChildren } from '@angular/core';
import {
  CarDestination,
  CarDestinationGroup,
  CarDestinationLink,
} from './car-destination';
import { CarSidenavGroup } from './sidenav-group';
import { CarSidenavLink } from './sidenav-link';

@Component({
  selector: 'car-sidenav',
  standalone: true,
  templateUrl: './car-sidenav.component.html',
  styleUrl: './car-sidenav.component.scss',
  host: {
    '[class.car-sidenav-opened]': 'opened()',
  },
  imports: [NgFor, CarSidenavGroup, CarSidenavLink],
})
export class CarSidenav {
  destinations = input.required<CarDestination[]>();

  readonly opened = signal(false);

  readonly groups = viewChildren(CarSidenavGroup);

  isLink(dest: CarDestination): CarDestinationLink | null {
    return 'url' in dest ? dest : null;
  }

  isGroup(dest: CarDestination): CarDestinationGroup | null {
    return 'children' in dest ? dest : null;
  }

  toggle() {
    if (this.opened()) {
      this.close();
    } else {
      this.open();
    }
  }

  open(): void {
    if (this.opened()) return;
    this.opened.set(true);
  }

  close(): void {
    if (!this.opened()) return;
    this.opened.set(false);
    this.groups().forEach((group) => group.opened.set(false));
  }
}
