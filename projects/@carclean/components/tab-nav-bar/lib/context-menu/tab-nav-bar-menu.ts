import { CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { Component, input } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { TabLink } from '../store/tab-link';

@Component({
  standalone: true,
  selector: 'car-tab-nav-bar-menu',
  hostDirectives: [CdkMenu],
  host: {
    '[class.car-tab-nav-bar-menu]': 'true',
    '[class.mat-elevation-z8]': 'true',
  },
  templateUrl: './tab-nav-bar-menu.html',
  styleUrl: './tab-nav-bar-menu.scss',
  imports: [CdkMenu, CdkMenuItem, MatRipple],
})
export class CarTabNavBarMenu {
  readonly tab = input.required<TabLink>();
}
