import { animate, style, transition, trigger } from '@angular/animations';
import { NgClass, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  CarDestination,
  CarDestinationGroup,
  CarDestinationLink,
} from './car-destination';
import { CarSidenavLink } from './sidenav-link';

@Component({
  standalone: true,
  selector: 'car-sidenav-group',
  templateUrl: './sidenav-group.html',
  styleUrl: './sidenav-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--data-level]': 'level()',
  },
  animations: [
    trigger('linkAnimation', [
      transition(':enter', [
        style({ opacity: 0, height: '0px' }),
        animate('200ms ease-out', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0, height: '0px' })),
      ]),
    ]),
  ],
  imports: [NgFor, NgClass, MatIcon, CarSidenavLink],
})
export class CarSidenavGroup {
  readonly group = input.required<CarDestinationGroup>();

  readonly opened = signal(false);

  readonly level = input<number>(0);

  readonly navigate = output<string>();

  isLink(dest: CarDestination): CarDestinationLink | null {
    return 'url' in dest ? dest : null;
  }

  isGroup(dest: CarDestination): CarDestinationGroup | null {
    return 'children' in dest ? dest : null;
  }

  toggle(): void {
    if (this.opened()) {
      this.close();
    } else {
      this.open();
    }
  }

  open(): void {
    this.opened.set(true);
  }

  close(): void {
    this.opened.set(false);
  }
}
