import { signal } from '@angular/core';
import { TabLinkStore } from './tab-link-store';

export class TabLink {
  readonly path!: string;

  readonly title = signal<string>(null!);

  constructor(title: string, path: string, private store: TabLinkStore) {
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
