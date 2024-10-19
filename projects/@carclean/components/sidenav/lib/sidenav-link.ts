import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CarDestinationLink } from './car-destination';

@Component({
  standalone: true,
  selector: 'car-sidenav-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--data-level]': 'level()',
  },
  template: `
    <a
      #linkAnchor
      tabindex="0"
      routerLinkActive="active"
      class="sidenav-link__anchor"
      [routerLink]="link().url"
      (click)="onClick($event)"
    >
      <div class="sidenav-link__icon">
        @if (level() === 0) {
          <mat-icon>{{ link().icon }}</mat-icon>
        }
      </div>

      <span class="sidenav-link__label">{{ link().label }}</span>
    </a>
  `,
  styleUrl: './sidenav-link.scss',
  imports: [RouterLink, MatIcon],
})
export class CarSidenavLink {
  readonly link = input.required<CarDestinationLink>();

  readonly level = input<number>(0);

  readonly navigate = output<string>();

  private readonly anchor =
    viewChild<ElementRef<HTMLAnchorElement>>('linkAnchor');

  onClick(event: MouseEvent) {
    event.stopPropagation();
    this.navigate.emit(this.link().url);
  }
}
