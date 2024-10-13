import { NgFor } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CarDestination } from './car-destination';

@Component({
  selector: 'car-sidenav',
  standalone: true,
  templateUrl: './car-sidenav.component.html',
  styleUrl: './car-sidenav.component.scss',
  host: {
    '[class.car-sidenav-opened]': 'opened()',
    '(mouseleave)': 'onMouseLeave()',
  },
  imports: [NgFor, MatIconButton, MatIcon],
})
export class CarSidenav {
  destinations = input.required<CarDestination[]>();

  readonly opened = signal(false);

  toggle() {
    this.opened.set(!this.opened());
  }

  onMouseLeave(): void {
    this.opened.set(false);
  }
}
