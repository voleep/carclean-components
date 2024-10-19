import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { CdkContextMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { NgFor, NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import {
  IsActiveMatchOptions,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { CarTabNavBarMenu } from './context-menu/tab-nav-bar-menu';
import { TabLink } from './store/tab-link';
import { TabLinkStore } from './store/tab-link-store';

@Component({
  selector: 'car-tab-nav-bar',
  standalone: true,
  templateUrl: `./tab-nav-bar.component.html`,
  styleUrls: [`./tab-nav-bar.component.scss`],
  imports: [
    NgFor,
    NgTemplateOutlet,
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
    MatMenu,
    MatMenuItem,
    CdkMenu,
    CdkMenuItem,
    CdkContextMenuTrigger,
    CarTabNavBarMenu,
  ],
})
export class CarTabNavBar {
  private readonly store = inject(TabLinkStore);

  private readonly router = inject(Router);

  readonly tabs = this.store.tabs;

  readonly isActiveOption: IsActiveMatchOptions = {
    matrixParams: 'exact',
    queryParams: 'ignored',
    paths: 'exact',
    fragment: 'exact',
  };

  constructor() {
    this.store.onClose
      .pipe(takeUntilDestroyed())
      .subscribe(this.onClose.bind(this));
  }

  drop(event: CdkDragDrop<TabLink>) {
    const pinned = this.tabs().filter((tab) => tab.pinned()).length;
    this.store.move(event.previousIndex + pinned, event.currentIndex + pinned);
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
