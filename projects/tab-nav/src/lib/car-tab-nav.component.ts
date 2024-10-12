import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TabNav } from './store/tab-nav';
import { TabNavStore } from './store/tab-nav-store';

@Component({
  selector: 'car-tab-nav',
  standalone: true,
  templateUrl: `./car-tab-nav.component.html`,
  styles: ``,
  imports: [
    NgFor,
    MatTabNav,
    MatTabNavPanel,
    MatIconButton,
    MatTabLink,
    RouterLink,
    RouterLinkActive,
    MatButton,
    MatIcon,
  ],
})
export class CarTabNav {
  private readonly store = inject(TabNavStore);

  private readonly router = inject(Router);

  readonly tabs = this.store.tabs;

  constructor() {
    this.store.onClose
      .pipe(takeUntilDestroyed())
      .subscribe(this.onClose.bind(this));
  }

  async close(tab: TabNav, event: Event): Promise<void> {
    event.preventDefault();
    await tab.close();
  }

  onCloseDown(event: Event): void {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  async onClose(tab: TabNav): Promise<void> {
    const index = this.tabs().indexOf(tab);
    const nextTab = this.tabs()[index + 1] ?? this.tabs()[index - 1];
    await this.router.navigate([nextTab?.path ?? '/']);
  }
}
