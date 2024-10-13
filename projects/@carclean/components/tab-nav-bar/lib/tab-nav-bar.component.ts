import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TabLink } from './store/tab-link';
import { TabLinkStore } from './store/tab-link-store';

@Component({
  selector: 'car-tab-nav-bar',
  standalone: true,
  templateUrl: `./tab-nav-bar.component.html`,
  styleUrls: [`./tab-nav-bar.component.scss`],
  imports: [
    NgFor,
    MatTabNav,
    MatTabNavPanel,
    MatIconButton,
    MatTabLink,
    RouterLink,
    RouterLinkActive,
    CdkDrag,
    CdkDropList,
    MatButton,
    MatIcon,
  ],
})
export class CarTabNavBar {
  private readonly store = inject(TabLinkStore);

  private readonly router = inject(Router);

  readonly tabs = this.store.tabs;

  constructor() {
    this.store.onClose
      .pipe(takeUntilDestroyed())
      .subscribe(this.onClose.bind(this));
  }

  drop(event: CdkDragDrop<TabLink>) {
    this.store.move(event.previousIndex, event.currentIndex);
  }

  async close(tab: TabLink, event: Event): Promise<void> {
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();
    await tab.close();
  }

  onCloseDown(event: Event): void {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  async onClose(tab: TabLink): Promise<void> {
    const index = this.tabs().indexOf(tab);
    const nextTab = this.tabs()[index + 1] ?? this.tabs()[index - 1];
    await this.router.navigate([nextTab?.path ?? '/']);
  }
}
