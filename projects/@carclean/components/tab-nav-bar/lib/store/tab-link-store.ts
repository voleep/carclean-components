import { Signal } from '@angular/core';
import { DetachedRouteHandle } from '@angular/router';
import { Subject } from 'rxjs';
import { TabLink } from './tab-link';

export abstract class TabLinkStore {
  abstract readonly tabs: Signal<TabLink[]>;
  readonly onClose = new Subject<TabLink>();
  abstract exists(path: string): boolean;
  abstract create(path: string, title: string): void;
  abstract remove(path: string): Promise<boolean>;
  abstract store(path: string, handle: DetachedRouteHandle): void;
  abstract retrieve(path: string): DetachedRouteHandle | null;
  abstract move(fromIndex: number, toIndex: number): void;
}
