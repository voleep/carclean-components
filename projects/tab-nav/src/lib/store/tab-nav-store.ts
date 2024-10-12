import { Signal } from '@angular/core';
import { DetachedRouteHandle } from '@angular/router';
import { Subject } from 'rxjs';
import { TabNav } from './tab-nav';

export abstract class TabNavStore {
  abstract readonly tabs: Signal<TabNav[]>;
  readonly onClose = new Subject<TabNav>();
  abstract exists(path: string): boolean;
  abstract create(path: string, title: string): void;
  abstract remove(path: string): Promise<boolean>;
  abstract store(path: string, handle: DetachedRouteHandle): void;
  abstract retrieve(path: string): DetachedRouteHandle | null;
}
