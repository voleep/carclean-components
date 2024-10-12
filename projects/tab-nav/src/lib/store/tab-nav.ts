import { signal } from '@angular/core';
import { TabNavStore } from './tab-nav-store';

export class TabNav {
  readonly path!: string;

  readonly title = signal<string>(null!);

  constructor(title: string, path: string, private store: TabNavStore) {
    this.path = path;
    this.title.set(title);
  }

  pin(): void {}

  unpin(): void {}

  close(): Promise<boolean> {
    const result = this.store.remove(this.path);
    this.store.onClose.next(this);
    return result;
  }
}
